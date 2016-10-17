var config = {
		server: {
			port: 80,
			useHttps: false,
			https: {
				keyPath: '',
				certPath: ''
			},
			appDirectory: __dirname,
			publicDirectory: 'public',
			routesDirectory: 'routes',
			fileDirectory: 'public/files',
			profilePicDirectory: 'public/images/profilePics',
			profilePicDefault: 'public/images/profileDefault.jpg',
			logDirectory: 'logs',
			loginExpirationMinutes: 15,
			chatTimeout: 2000,
			admins: ['ewadkins', 'vontell', 'loctrinh']
		},    
		db: {
			hostname: 'localhost',
	        port: 27017,
	        mainDb: 'appa',
	        useSSL: false,
	        required: true,
	        authenticate: false,
	        authentication: {
	            username: '',
	            password: ''
	        },
	        collections: {
	        	users: 'users',
	        	sessions: 'sessions',
	        	announcements: 'announcements'
	        }
	    },
	    users: [
                'jhbell',
                'jamescao',
                'chauhans',
                'jcorona',
                'hdiehl',
                'lilydove',
                'ignacioe',
                'edwardf',
                'mfeffer',
                'rgulland',
                'jacqliu',
                'domenicn',
                'pnoyola',
                'rprice',
                'jerios',
                'jspileck',
                'edstiles',
                'tristant',
                'jmtorres',
                'loctrinh',
                'snvd',
                'vontell',
                'ewadkins',
                'stellay'
                ]
}

module.exports = config;