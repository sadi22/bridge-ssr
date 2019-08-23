let wpUrl = 'https://wordpress.org/news/wp-json';

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node') {
  wpUrl = 'https://wordpress-140306-965573.cloudwaysapps.com/wp-json';
}
const Config = {
  apiUrl: wpUrl,
};

export default Config;
