# Hakeem - AI-Powered Legal Consultation

**Hakeem** uses **Allam LLM** to simplify legal consultations in Arabic, providing fast, accurate, and context-aware legal advice through a smart and intuitive chatbot interface. The system integrates cutting-edge NLP technology with an efficient search and retrieval mechanism to support users in navigating complex legal texts seamlessly.

## Key Features
- 🚀 **Instant Legal Advice**: Get fast, accurate, and contextually relevant legal answers, making legal assistance more accessible than ever.
- 🔍 **Smart Search**: Uses advanced semantic search powered by FAISS and Elasticsearch to retrieve the most relevant legal documents and case laws.
- 🧠 **Allam LLM**: Employs Allam's NLP capabilities to understand user queries in Arabic and generate insightful, summarized responses.

## Tech Stack
- **Frontend**: Built using **Angular** for a responsive and user-friendly experience, providing real-time interactions with the legal chatbot.
- **Backend**: Developed with **FastAPI** in Python to handle API requests efficiently and integrate seamlessly with the NLP and search modules.
- **NLP**: Utilizes **Allam LLM** for language understanding and response generation, **FAISS** for high-speed vector search, and **Elasticsearch** for indexing and querying large volumes of legal data.
- **Deployment**: Containerized with **Docker** and deployed on **AWS** for scalability and reliability.

# Install Python using MiniConda
Download and install MiniConda from here
Create a new environment using the following command:
$ conda create -n mini-rag python=3.8

# Activate the environment:
$ conda activate mini-rag

# (Optional) Setup you command line interface for better readability
export PS1="\[\033[01;32m\]\u@\h:\w\n\[\033[00m\]\$ "

## Installation
Install the required packages
$ pip install -r requirements.txt
## Setup the environment variables
$ cp .env.example .env
Set your environment variables in the .env file. Like OPENAI_API_KEY value.

# Run Docker Compose Services
$ cd docker
$ cp .env.example .env
# update .env with your credentials
$ cd docker
$ sudo docker compose up -d


## Run the FastAPI server
$ uvicorn main:app --reload --host 0.0.0.0 --port 5000

## POSTMAN Collection
Download the POSTMAN collection from /assets/mini-rag-app.postman_collection.json

# Hakeem-Application Frontend

hakeem• Design  System Angular will help you create a clean and simple website that is a perfect fit for today's black design. It is built using the 12 column grid system, with components designed to fit together perfectly. It makes use of bold colours, beautiful typography, clear photography and spacious arrangements.

## Complex Documentation

Each element is well presented in a very complex documentation. You can read more about the idea behind this design system here. You can check the components here and the foundation here.

## Bootstrap 4 Support

hakeem• Design System Angular is built on top of the much awaited Bootstrap 4 and Angular. This makes starting a new project very simple. It also provides benefits if you are already working on a Bootstrap 4 or Angular project; you can just import the hakeem• Design System Angular style over it. Most of the elements have been redesigned; but if you are using an element we have not touched, it will fall back to the Bootstrap default.


## Table of Contents

* [Versions](#versions)
* [Demo](#demo)
* [Quick Start](#quick-start)
* [Deploy](#deploy)
* [File Structure](#file-structure)
* [Browser Support](#browser-support)

## Quick start

- Clone the repo: `git clone https://github.com/Pro-AmalTarek/Hakeem-Application.git`.
- `npm i hakeem-design-system-angular`
- ng serve -o

## Deploy

:rocket: You can deploy angular app on your own server ex: IIS, Docker...

## File Structure
Within the download you'll find the following directories and files:

```
hakeem• Design System Angular
├── CHANGELOG.md
├── ISSUE_TEMPLATE.md
├── LICENSE.md
├── README.md
├── angular.json
├── e2e
├── package-lock.json
├── package.json
├── src
│   ├── app
│   │   ├── app-routing.module.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.spec.ts
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   └── pages
│   │       ├── examples
│   │       │   ├── landingpage
│   │       │   │   ├── landingpage.component.html
│   │       │   │   └── landingpage.component.ts
│   │       │   ├── profilepage
│   │       │   │   ├── profilepage.component.html
│   │       │   │   └── profilepage.component.ts
│   │       │   └── registerpage
│   │       │       ├── registerpage.component.html
│   │       │       └── registerpage.component.ts
│   │       ├── index
│   │       │   ├── index.component.html
│   │       │   └── index.component.ts
│   │       └── pages.module.ts
│   ├── assets
│   │   ├── css
│   │   │   └── nucleo-icons.css
│   │   ├── demo
│   │   ├── fonts
│   │   ├── img
│   │   └── scss
│   │       ├── hakeem-design-system
│   │       │   ├── angular
│   │       │   ├── bootstrap
│   │       │   └── custom
│   │       └── hakeem-design-system.scss
│   ├── browserslist
│   ├── environments
│   ├── favicon.ico
│   ├── index.html
│   ├── karma.conf.js
│   ├── main.ts
│   ├── polyfills.ts
│   ├── styles.scss
│   ├── test.ts
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── tslint.json
├── tsconfig.json
└── tslint.json
```


## Browser Support

At present, we officially aim to support the last two versions of the following browsers:


