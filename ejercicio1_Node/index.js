const http = require('http');
const os = require('os');
const fs = require('fs');
const loadavgWindows = require('loadavg-windows');

try {
	  const data = fs.readFileSync('config.json', 'utf8');
	  config = JSON.parse(data);
} catch (e) {
	  console.log('Error con config.json');
}

console.log('Sistema operativo:', os.platform(), os.release());
console.log('CPU:', os.cpus()[0].model);
console.log('Memoria:', (os.totalmem() / 1024 / 1024).toFixed(2));
console.log('Versión de Node:', process.version);
console.log('---------------------------------------');

function mostrarInfo() {
	console.log('Uso de CPU:', os.loadavg()[0].toFixed(2));
    	console.log('Uso de memoria:', (process.memoryUsage().rss / 1024 / 1024).toFixed(2));
      	console.log('Tiempo que el sistema lleva activo:', os.uptime().toFixed(0));
        console.log('Tiempo que lleva ejecutándose node.js:', process.uptime().toFixed(0));
        console.log('---------------------------------------');
}

setInterval(mostrarInfo, config.intervalSeconds * 1000);

const server = http.createServer((req, res) => {
	res.end('Node.js funcionando correctamente\n');
});

server.listen(3000, () => {
	console.log('El servidor está escuchando en http://localhost:3000');
});
