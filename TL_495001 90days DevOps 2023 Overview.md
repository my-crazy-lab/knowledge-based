## Secure coding

- SAST: Static Application Security Testing 
    - method of evaluating the security of an application by analyzing the source code
- SCA: Software composition Analysis
    - scan the codebase of a software project and provide a report that lists all the open source libraries, frameworks, and components that are being used
- Secure coding review
    - Identify the scope of the review
    - Set up a review team
    - Conduct the review
    - Document findings
    - Remediate vulnerabilities

## Secure: Continuous Build, Integration, Testing

- Image scanning
    - looking inside the container, getting the list of installed packages
- CVE: Common Vulnerability and Exposures
    - allows us to track vulnerabilities and be able to easily search for them
- SBOM: Software Bill Of Materials
    - list of all the components that make up a software application or system
- CVSS: Common Vulnerability Scoring System.
    - capture the principal characteristics of a vulnerability and produce a numerical score reflecting its severity
- Fuzzing: fuzz testing
    - goal: identify security vulnerabilities and other bugs in the program by causing it to crash or exhibit unintended behaviour
- DAST: Dynamic Application Security Testing
    - evaluate the security of an application by simulating attacks from external sources
- IAST: Interactive Application Security Testing
    - injecting a small agent into the application's runtime environment and monitoring its behaviour in real-time.

## Secure: Continuous Delivery & Deployment

- A sample CI/CD pipeline could look like this:
    - Developer pushes code
    - Lint the code
    - Build the code
    - Test the code
    - Build the artifacts (container images, helm charts, etc.)
    - Scan the artifacts
    - (Optional) Send the scan results somewhere
    - (Optional) Verify the scan results and fail the pipeline if the verification fails
    - Push the artifacts to a repository
- Artifacts Scan
    - For maximum security, you would be scanning all the artifacts that you use for your environment, not only your container images.
- Two main types of vulnerability scan: unauthenticated and authenticated.
    - Containers Vulnerability Scanning
        - image scanning only shows you the list of known vulnerabilities. There might be many vulnerabilities which have not been discovered, but are still there and could be exploited.
        - the security of our deployments depends not only on the image and number of vulnerabilities, but also on the way we deploy that image
        - Containers run on hosts -> If your host is not secured, and someone manages to break it, they will probably have access to your containers and be able to start, stop, modify them, etc.
    - Network Vulnerability Scan
        - identifying weaknesses on a network
        - relies on a database of known vulnerabilities and automated tests for them
        - scan a wide range of devices and hosts on your networks, identifying the device type and operating system, and probing for relevant vulnerabilities

## Secrets Management

- Long-Lived Credentials
- Dynamic Secrets
- Access Control and Auditing

## Secure: Runtime Defence & Monitoring

- 

## Red Hat OpenShift

- 

## Secure Databases

- 

## Serverless

- 

## Service Mesh

- 
