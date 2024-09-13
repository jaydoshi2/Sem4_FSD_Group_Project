import random
import json
import torch
from .model import NeuralNet
import os
import nltk
from .nltk_utils import bag_of_words, tokenize

# Set up NLTK data path
nltk_data_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'nltk_data')
nltk.data.path.append(nltk_data_path)

# Check if punkt tokenizer is available, if not, download it
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    print("Downloading punkt tokenizer...")
    nltk.download('punkt', download_dir=nltk_data_path)

# Check if punkt_tab is available, if not, download it
try:
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    print("Downloading punkt_tab...")
    nltk.download('punkt_tab', download_dir=nltk_data_path)

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

current_dir = os.path.dirname(os.path.abspath(__file__))
intents_path = os.path.join(current_dir, 'intents.json')
with open(intents_path, 'r') as json_data:
    intents = json.load(json_data)

FILE = os.path.join(current_dir, 'data.pth')
print("Data file path:", FILE)

if not os.path.exists(FILE):
    raise FileNotFoundError(f"Model file not found: {FILE}")

data = torch.load(FILE, weights_only=True)

input_size = data["input_size"]
hidden_size = data["hidden_size"]
output_size = data["output_size"]
all_words = data['all_words']
tags = data['tags']
model_state = data["model_state"]

model = NeuralNet(input_size, hidden_size, output_size).to(device)
model.load_state_dict(model_state)
model.eval()

bot_name = "Sam"

def get_response(msg):
    sentence = tokenize(msg)
    X = bag_of_words(sentence, all_words)
    X = X.reshape(1, X.shape[0])
    X = torch.from_numpy(X).to(device)

    output = model(X)
    _, predicted = torch.max(output, dim=1)

    tag = tags[predicted.item()]

    probs = torch.softmax(output, dim=1)
    prob = probs[0][predicted.item()]
    if prob.item() > 0.75:
        for intent in intents['intents']:
            if tag == intent["tag"]:
                return random.choice(intent['responses'])
    
    return "I do not understand..."

if __name__ == "__main__":
    print("Let's chat! (type 'quit' to exit)")
    while True:
        sentence = input("You: ")
        if sentence == "quit":
            break

        resp = get_response(sentence)
        print(resp)

print("Chat ended.")


