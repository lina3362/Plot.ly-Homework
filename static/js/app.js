
function getPlots(id) {
//Use the D3 library to read in samples.json
    d3.json("samples.json").then(sampledata => {
        console.log(sampledata)
        var ids = sampledata.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(sampleValues)
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(labels)
        var OTU_top = (sampledata.samples[0].otu_ids.slice(0,10)).reverse();
        var OTU_id = OTU_top.map(d => "OTU " + d);
        console.log('OTU IDS: ${OTU_id}')
        //set up the top 10 labels
        var labels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log('OTU_labels: ${labels}')
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'grey blue'},
            type:"bar",
            orientation: "h",
        };
        //create data variable
        var data = [trace];

        //create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
        };

        //create the bar plot
        Plotly.newPlot("bar", data, layout);

        //Create the bubble chart
        var trace1 = {
            x: sampledata.samples[0].otu_ids,
            y: sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
        };

        //set the layout
        var layout_2 = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1000
        };

        //create data variable
        var data1 = [trace1];

    //create the bubble plot
    Plotly.newPlot("bubble", data1, layout_2);

    });
}


// create the function to get the necessary data
function getDemoInfo(id) {
    // read the json file to get data
        d3.json("samples.json").then((data)=> {
    // get the metadata info for the demographic panel
            var metadata = data.metadata;
    
            console.log(metadata)
    
          // filter meta data info by id
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          // select demographic panel to put data
           var demographicInfo = d3.select("#sample-metadata");
            
         // empty the demographic info panel each time before getting new id info
           demographicInfo.html("");
    
         // grab the necessary demographic data data for the id and append the info to the panel
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toLowerCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // create the function for the change event
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }

// create the function for the initial data rendering
function init() {
    //create a dropdown menu
    var dropdownMenu = d3.select("#selDataset");

    //grab the data from the file
    d3.json("samples.json").then((data)=> {
        console.log(data)

        //have the names in the dropdown menu
        data.names.forEach(function(name) {
            dropdownMenu.append("option").text(name).property("value");
        });

        //call the functions to display the data 
        getPlots(data.names[0]);
        getDemoInfo(data.name[0]);
    });
}

init();
