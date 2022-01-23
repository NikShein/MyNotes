const Helpers = {
    truncate: function (string) {
        if (string.length < 150) {
            return string;
    
        }
        else if (string.length > 150) {
            let sub = string.slice(0, 150).concat('...');
            return sub;
        }
    },

    dateTransform: function (string) {
        return string.toLocaleDateString()
    },
}

module.exports = Helpers;