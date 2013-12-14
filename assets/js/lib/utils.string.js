(function() {
  // **********************************************************
  // supplant() method from Crockfords `Remedial Javascript`

  var supplant =  function( template, values, pattern ) {
    pattern = pattern || /\{([^\{\}]*)\}/g;

    return template.replace(pattern, function(a, b) {
        var p = b.split('.'),
            r = values;
        
        try {
           for (var s in p) { r = r[p[s]];  };
        } catch(e){
          r = a;
        }
        
        return (typeof r === 'string' || typeof r === 'number') ? r : a;
      });
    };


    // supplant() method from Crockfords `Remedial Javascript`
    Function.prototype.method = function (name, func) {
         this.prototype[name] = func;
         return this;       
    };
    
    String.method("supplant", function( values, pattern ) {                                    
        var self = this;
        return supplant(self, values, pattern);
    });

    String.supplant = supplant;

    // **********************************************************
})();