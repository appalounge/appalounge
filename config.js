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
                'amowayed',
                'jhbell',
                'chauhans',
                'jcorona',
                'hdiehl',
                'lilydove',
                'ignacioe',
                'mfeffer',
                'cierag',
                'rgulland',
                'asheidt',
                'yji',
                'nkogan',
                'jacqliu',
                'pnoyola',
                'dypark',
                'rprice',
                'regirock',
                'jerios',
                'jspileck',
                'emistan4',
                'edstiles',
                'tristant',
                'loctrinh',
                'snvd',
                'vontell',
                'ewadkins'
                ]
}

module.exports = config;