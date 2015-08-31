var config = {
		server: {
			port: 80,
			useHttps: false,
			https: {
				keyPath: '',
				certPath: ''
			}
		},    
		db: {
			hostname: 'localhost',
	        port: 27017,
	        mainDb: 'appa',
	        useSSL: false,
	        required: false,
	        authenticate: false,
	        authentication: {
	            username: '',
	            password: ''
	        },
	        collections: {
	        	users: 'users',
	        	members: 'members'
	        }
	    }
}

module.exports = config;