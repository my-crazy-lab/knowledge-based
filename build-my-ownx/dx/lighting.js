// Lighting System - Phong and Blinn-Phong lighting models
// Calculates lighting for vertices and fragments

class Material {
    constructor() {
        // Phong material properties
        this.ambient = new Vector3(0.1, 0.1, 0.1);    // Ambient color
        this.diffuse = new Vector3(0.8, 0.8, 0.8);    // Diffuse color
        this.specular = new Vector3(1.0, 1.0, 1.0);   // Specular color
        this.shininess = 32.0;                         // Specular exponent
        this.emissive = new Vector3(0.0, 0.0, 0.0);   // Emissive color
    }

    // Set material colors
    setColors(ambient, diffuse, specular) {
        this.ambient = ambient;
        this.diffuse = diffuse;
        this.specular = specular;
    }

    // Set shininess
    setShininess(shininess) {
        this.shininess = shininess;
    }
}

class LightingCalculator {
    constructor() {
        this.ambientLight = new Vector3(0.2, 0.2, 0.2); // Global ambient light
    }

    // Set global ambient light
    setAmbientLight(color) {
        this.ambientLight = color;
    }

    // Calculate Phong lighting for a vertex
    calculatePhongLighting(vertex, material, lights, cameraPosition) {
        const position = vertex.position;
        const normal = vertex.normal;
        
        if (!normal) {
            // No normal, return diffuse color
            return this.vectorToColor(material.diffuse);
        }

        // Start with ambient light
        let finalColor = this.ambientLight.multiply(1.0);
        finalColor = this.multiplyVectors(finalColor, material.ambient);

        // Add emissive
        finalColor = finalColor.add(material.emissive);

        // Calculate lighting from each light source
        lights.forEach(light => {
            const lightContribution = this.calculateLightContribution(
                position, normal, material, light, cameraPosition
            );
            finalColor = finalColor.add(lightContribution);
        });

        // Clamp to [0, 1] range
        finalColor = new Vector3(
            Math.min(1.0, Math.max(0.0, finalColor.x)),
            Math.min(1.0, Math.max(0.0, finalColor.y)),
            Math.min(1.0, Math.max(0.0, finalColor.z))
        );

        return this.vectorToColor(finalColor);
    }

    // Calculate lighting contribution from a single light
    calculateLightContribution(position, normal, material, light, cameraPosition) {
        let lightDirection;
        let lightDistance = 1.0;
        let attenuation = 1.0;

        const lightPosition = light.getWorldPosition();

        if (light.type === 'directional') {
            // Directional light
            lightDirection = light.getDirection().multiply(-1); // Reverse direction
        } else if (light.type === 'point') {
            // Point light
            const lightVector = lightPosition.subtract(position);
            lightDistance = lightVector.length();
            lightDirection = lightVector.normalize();
            
            // Calculate attenuation (simple quadratic falloff)
            attenuation = 1.0 / (1.0 + 0.09 * lightDistance + 0.032 * lightDistance * lightDistance);
        } else if (light.type === 'spot') {
            // Spot light (simplified)
            const lightVector = lightPosition.subtract(position);
            lightDistance = lightVector.length();
            lightDirection = lightVector.normalize();
            
            const spotDirection = light.getDirection();
            const spotEffect = lightDirection.dot(spotDirection.multiply(-1));
            
            if (spotEffect > Math.cos(light.spotAngle)) {
                attenuation = spotEffect;
            } else {
                return new Vector3(0, 0, 0); // Outside spot cone
            }
        }

        // Calculate diffuse lighting (Lambert)
        const normalizedNormal = normal.normalize();
        const normalizedLightDir = lightDirection.normalize();
        const diffuseFactor = Math.max(0.0, normalizedNormal.dot(normalizedLightDir));
        
        const diffuse = this.multiplyVectors(
            material.diffuse,
            light.color.multiply(light.intensity * diffuseFactor * attenuation)
        );

        // Calculate specular lighting (Phong)
        let specular = new Vector3(0, 0, 0);
        if (diffuseFactor > 0.0) {
            const viewDirection = cameraPosition.subtract(position).normalize();
            const reflectDirection = this.reflect(normalizedLightDir.multiply(-1), normalizedNormal);
            const specularFactor = Math.pow(
                Math.max(0.0, viewDirection.dot(reflectDirection)),
                material.shininess
            );
            
            specular = this.multiplyVectors(
                material.specular,
                light.color.multiply(light.intensity * specularFactor * attenuation)
            );
        }

        return diffuse.add(specular);
    }

    // Calculate Blinn-Phong lighting (alternative specular calculation)
    calculateBlinnPhongSpecular(position, normal, material, lightDirection, cameraPosition, light) {
        const viewDirection = cameraPosition.subtract(position).normalize();
        const halfVector = lightDirection.add(viewDirection).normalize();
        
        const specularFactor = Math.pow(
            Math.max(0.0, normal.normalize().dot(halfVector)),
            material.shininess
        );
        
        return this.multiplyVectors(
            material.specular,
            light.color.multiply(light.intensity * specularFactor)
        );
    }

    // Reflect vector around normal
    reflect(incident, normal) {
        return incident.subtract(normal.multiply(2.0 * incident.dot(normal)));
    }

    // Component-wise vector multiplication
    multiplyVectors(v1, v2) {
        return new Vector3(v1.x * v2.x, v1.y * v2.y, v1.z * v2.z);
    }

    // Convert Vector3 to color object
    vectorToColor(vector) {
        return {
            r: Math.floor(vector.x * 255),
            g: Math.floor(vector.y * 255),
            b: Math.floor(vector.z * 255),
            a: 255
        };
    }

    // Interpolate colors (for smooth shading)
    interpolateColors(color1, color2, color3, barycentricCoords) {
        const { u, v, w } = barycentricCoords;
        
        return {
            r: Math.floor(color1.r * w + color2.r * u + color3.r * v),
            g: Math.floor(color1.g * w + color2.g * u + color3.g * v),
            b: Math.floor(color1.b * w + color2.b * u + color3.b * v),
            a: 255
        };
    }

    // Calculate normal for flat shading
    calculateFaceNormal(v1, v2, v3) {
        const edge1 = v2.subtract(v1);
        const edge2 = v3.subtract(v1);
        return edge1.cross(edge2).normalize();
    }

    // Apply tone mapping (simple Reinhard)
    toneMap(color) {
        const luminance = 0.299 * color.r + 0.587 * color.g + 0.114 * color.b;
        const mappedLuminance = luminance / (1.0 + luminance);
        const scale = mappedLuminance / Math.max(luminance, 0.001);
        
        return {
            r: Math.floor(Math.min(255, color.r * scale)),
            g: Math.floor(Math.min(255, color.g * scale)),
            b: Math.floor(Math.min(255, color.b * scale)),
            a: color.a
        };
    }
}

// Predefined materials
class Materials {
    static createMetal() {
        const material = new Material();
        material.setColors(
            new Vector3(0.1, 0.1, 0.1),
            new Vector3(0.7, 0.7, 0.7),
            new Vector3(1.0, 1.0, 1.0)
        );
        material.setShininess(128.0);
        return material;
    }

    static createPlastic() {
        const material = new Material();
        material.setColors(
            new Vector3(0.1, 0.1, 0.1),
            new Vector3(0.8, 0.2, 0.2),
            new Vector3(0.5, 0.5, 0.5)
        );
        material.setShininess(32.0);
        return material;
    }

    static createRubber() {
        const material = new Material();
        material.setColors(
            new Vector3(0.1, 0.1, 0.1),
            new Vector3(0.3, 0.3, 0.3),
            new Vector3(0.1, 0.1, 0.1)
        );
        material.setShininess(4.0);
        return material;
    }

    static createGold() {
        const material = new Material();
        material.setColors(
            new Vector3(0.24725, 0.1995, 0.0745),
            new Vector3(0.75164, 0.60648, 0.22648),
            new Vector3(0.628281, 0.555802, 0.366065)
        );
        material.setShininess(51.2);
        return material;
    }

    static createEmerald() {
        const material = new Material();
        material.setColors(
            new Vector3(0.0215, 0.1745, 0.0215),
            new Vector3(0.07568, 0.61424, 0.07568),
            new Vector3(0.633, 0.727811, 0.633)
        );
        material.setShininess(76.8);
        return material;
    }
}

// Export classes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Material, LightingCalculator, Materials };
}
