var CKI = CKI || {};
CKI.Importers = CKI.Importers || {};

CKI.Importers.cointrackerIo = {
    textToLines: function(allText) {
        // return csv text as an array of objects
        console.log(allText);
        var allTextLines = allText.split(/\r\n|\n/);

        var headers = allTextLines[0].split(',');
        for (var j=0; j<headers.length; j++) {
            // string quotes from string
            var cleanData = headers[j].replace(/['"]+/g, '').trim()
            headers[j] = cleanData;
            console.log(cleanData);
        }
        var lines = [];

        for (var i=1; i<allTextLines.length; i++) {
            // remove commas in any numbers
            var line = allTextLines[i];
            var data = line.split(',');
            if (data.length == headers.length) {

                var tobj = {};
                for (var j=0; j<headers.length; j++) {
                    // string quotes from string
                    var cleanData = data[j].replace(/['"]+/g, '')
                    tobj[headers[j]] = cleanData;
                }
                lines.push(tobj);
            }else{
                console.log("skipping row")
                console.log(line);
            }
        }
        return lines;
    },

    parseCsvRow: function(sourceObj) {
            
        return {
            reportingCategory: (sourceObj["Type"] == "Short Term") ? 3 : 6,
            description: sourceObj['Asset Name'],
            dateAcquired: sourceObj["Received Date"],
            dateSold: sourceObj["Date Sold"],
            salesPrice: sourceObj["Proceeds (USD)"],
            costBasis: sourceObj["Cost Basis (USD)"],
            adjustmentAmount: (sourceObj["adjustmentAmount"]) ? sourceObj["adjustmentAmount"] : "0.00",
            adjustmentCode: (sourceObj["adjustmentCode"]) ? sourceObj["adjustmentCode"] : "0.00",
        }
    }
};
