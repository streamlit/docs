---
title: LLM glossary
slug: /knowledge-base/tutorials/llm-apps/llm-glossary
---

# LLM glossary

## **Artificial intelligence (AI)**

AI refers to the development of intelligent machines that can perform complex tasks, such as understanding language, recognizing patterns, and making decisions, similar to human intelligence. It involves training algorithms to learn from data and improve their performance over time.

## Generative AI

### Large language model (LLM)

A large language model is a transformer type of neural network (like OpenAI’s GPT series) that’s trained on a huge corpus of natural language data, enabling general-purpose, programmable AI (sometimes referred to as foundation models). LLMs use deep learning to understand complex language patterns and generate human-like text.

### Generative pre-trained transformer (GPT)

GPTs are the superheroes of text generation. They’re LLMs that use the transformer architecture to generate human-like text. They can understand context and produce responses, making them useful for apps like chatbots.

### Retrieval Augmented Generation (RAG)

[Retrieval Augmented Generation (RAG)](https://blog.streamlit.io/build-a-chatbot-with-custom-data-sources-powered-by-llamaindex/#21-local-development) is a technique to supercharge language models like ChatGPT when handling complex tasks that need a lot of knowledge. Instead of just relying on what the model knows, RAG lets the model fetch information from external sources, like Wikipedia, to make its responses more reliable and accurate. It's like giving the model a superpower to look up facts and use them to create better answers. This way, RAG helps the model adapt to changing information and produce trustworthy results without having to be retrained from scratch. It combines the best of both worlds: the model's smarts and the latest information from the web.

## Learning types and keywords

### **Deep learning (DL)**

Deep learning (DL) is a branch of ML where neural networks with multiple layers learn to perform complex tasks by progressively extracting higher-level features from data. It’s very good at image recognition, speech processing, and natural language understanding due to its ability to capture intricate data patterns.

### **Transfer learning**

Transfer learning is a technique where a model pre-trained on one task is fine-tuned for a different but related task. In LLM apps, transfer learning involves using a pre-trained LLM as a starting point and adapting it to specific tasks.

### **Zero-shot learning**

Zero-shot learning is a technique where a model is trained to perform tasks it hasn't seen during training. LLMs can generalize from prompts to generate responses for tasks they were not explicitly trained on.

### Few-shot learning

Few-shot learning is a technique where a model is trained on related tasks so it can perform new tasks with limited examples. LLMs can generalize from prompts and a few examples to generate responses for tasks they were not explicitly trained on.

### **Reinforcement learning from human feedback (RLHF)**

RLHF is a technique to improve LLM responses. Human feedback on model outputs is used to train a reward model, which guides fine-tuning to align the LLM's output with human preferences.

### **Fine-tuning**

Fine-tuning your LLM app involves adapting a pre-trained LLM to a specific task by training it on a relevant dataset. It helps the model specialize in the desired domain and improve performance.

### **Hyperparameter tuning**

Hyperparameter tuning optimizes an ML model's performance by adjusting pre-defined settings, known as hyperparameters, such as learning rates and layer sizes. These settings affect a model's ability to generalize to new data. The goal is to find the best hyperparameter values that balance underfitting and overfitting. Automated tools and techniques help to systematically search for optimal hyperparameter values, improving the model's performance.

### **Overfitting**

Overfitting occurs when a model performs well on its training data but poorly on new, unseen data. It's important to monitor for overfitting when fine-tuning LLMs to ensure they generalize well to different inputs.

## Interfacing with a model

### **Attention mechanism**

An attention mechanism in neural networks allows the model to focus on different parts of input data when making predictions. Transformers, the architecture behind LLMs, use attention mechanisms to consider the context of words in a sequence.

### **Encoder and decoder networks**

Encoder and decoder networks are architecture components in natural language processing. The encoder converts input text into a fixed-length numerical representation, while the decoder generates output text based on that representation.

### LLM model parameters

- Temperature
- Token limit
- Top-k
- Top-p
- Context window

### **Text embedding**

Text embedding is the process of converting text into a numerical representation that captures its semantic meaning. Embeddings allow LLMs to process and compare text efficiently, making them a crucial component in various NLP tasks.

### **Tokenization**

Tokenization is the process of splitting text into individual tokens, such as words or subwords. LLMs process text as a sequence of tokens, making tokenization a crucial preprocessing step.

### **Vector database**

A vector database stores data in a way that facilitates efficient similarity searches. When working with LLMs, vector databases are used to store embeddings of text, allowing you to quickly find similar pieces of content.

## Implementation and use cases

### **Chatbot**

A chatbot is an application that uses AI to simulate human conversation. LLMs can power chatbots, enabling them to understand user input and provide coherent and contextually relevant responses.

### **Inference**

Inference refers to using a trained model to make predictions or generate outputs based on new input data. In LLM apps, inference involves feeding input text to the model and obtaining its generated response.

### **Natural language generation (NLG)**

Natural Language Generation (NLG) enables computers to produce human-like text or speech. It involves algorithms converting structured data into coherent and contextually appropriate language, finding applications in chatbots, content generation, and personalized recommendations.

### **Natural language processing (NLP)**

NLP involves the interaction between computers and human language. It encompasses tasks like language translation, sentiment analysis, text classification, and speech recognition. NLP models, including LLMs, are trained to understand and generate human language.

### **Prompt engineering**

Prompt engineering involves crafting effective input instructions (prompts) for LLMs. By understanding the model's capabilities and limitations, you can create prompts that give you the desired outputs. An effective prompt gives an LLM context. If you ask a model to show you "five nurses" you will likely get an image with five, young, white women in scrubs. You can mitigate this bias by asking for "five nurses of different ages, genders, and races."

### **Streamlit**

Streamlit is a Python library for creating interactive web applications with minimal code. It's a go-to platform for creating LLM-based apps, deploying them to the Streamlit Community Cloud and sharing them with users.
