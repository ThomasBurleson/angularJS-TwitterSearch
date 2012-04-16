# ************************************************
# Build HTTP and HTTP_PROXY servers
#
#  Note: to debug Node.js scripts, 
#        see https://github.com/dannycoates/node-inspector
#
# Copyright 2012     Mindspace, LLC.
# ************************************************

		# Include the HTTP and HTTP Proxy classes
		# @see http://nodejs.org/docs/v0.4.2/api/modules.html
		#
		ext = require('httpServers')


		# Main application
		#
		main = (options) ->
			
			options ||= { 
					'proxy_regexp' : /^\/api\/json/
					'local_port'   : 8080
					'local_host'   : '127.0.0.1' 		
					'remote_port'  : 80
					'remote_host'  : 'services.gridlinked.info'  

					# Only used to explicity define the local, hidden web server port
					#'silent_port'  : 8000
				}

			# Primary server, proxies specific GETs to remote web 
			# server or to local web server
			new ext.HttpProxyServer() .start( options )

			return	

		# Auto-start
		#
		main()
