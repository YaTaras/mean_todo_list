// setting logger (morgan)
module.exports = {
	skip: function (req, res) { 
		//return res.statusCode < 400; 
		// we don't want to see rendering page logs
		return res.req.url.indexOf('livePage=') > 0;
	}
};