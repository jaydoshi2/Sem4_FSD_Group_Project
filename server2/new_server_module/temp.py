import os

# Check if the directory exists and list its contents
if os.path.exists("C:\\fine-tuned-flan-t5"):
    print("Directory contents:", os.listdir("fine-tuned-flan-t5"))
else:
    
    print("Directory not found.")
