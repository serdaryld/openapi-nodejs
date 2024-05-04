
# OpenAPI Implementation With Node.js

This is a simple API application developed using Express on Node.js, which performs CRUD operations and simulates a course management system for a university. It has been prepared and documented according to OpenAPI (Swagger) standards.


## Prerequisites
You will need the following things properly installed on your computer.

<ul>
<li>Git</li> 
<li>Node.js (with NPM)</li>
</ul>


## Installation
<ul>
<li><code>git clone https://github.com/serdaryld/openapi-nodejs</code></li>
<li><code>cd openapi-nodejs</code></li>
<li><code>npm install</code></li>
</ul>

## Running
To run this project:

<ul>
<li><code>node index.js</code></li>
<li>Then open <code>http://localhost:4000/api-docs</code> in your browser.</li>
</ul>


## Docker
You can access the Docker image for this project at  https://hub.docker.com/r/serdaryld/openapi-nodejs


If Docker is installed on your computer, to pull and run this image:
<ul>
<li><code>docker pull serdaryld/openapi-nodejs:1.0.0</code></li>
<li><code>docker run -p 4000:4000 serdaryld/openapi-nodejs:1.0.0</code></li>
<li>Then open <code>http://localhost:4000/api-docs</code> in your browser.</li>
</ul>

<br/>

## License

[MIT License](LICENSE)

