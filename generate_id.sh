#!/bin/bash  

# Function to generate a random ID  
generateId() {  
    LENGTH=6  
    CHARS=(1 2 3 4 5 6 7 8 9 0 \
           q w e r t y u i o p \
           l k j h g f d s a \
           z x c v b n m)  

    id=""  
    for (( i=0; i<LENGTH; i++ )); do  
        # Generate a random index based on the length of CHARS array  
        random_index=$(( RANDOM % ${#CHARS[@]} ))  
        id+=${CHARS[$random_index]}  
    done  
    echo "$id"  # Output the generated ID  
}  

# Call the function and print the result  
generateId  