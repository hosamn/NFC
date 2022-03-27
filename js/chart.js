function getParamValue(paramName) {
    // Reading parameter values
    
    var url = window.location.search.substring(1); //get rid of "?" in querystring
    var qArray = url.split('&'); //get key-value pairs
    
    for (var i = 0; i < qArray.length; i++) {
        var pArr = qArray[i].split('='); //split key and value
        if (pArr[0] == paramName)
            return pArr[1]; //return value
    }
};

// function zfill(num, len) {
//     return (Array(len).join("0") + num).slice(-len);
// };


var urlData = {
    outputName  : getParamValue("outputname"),  // used for file name, one of ["had", "don", "gab", "khr", "mlk", "ros", "sen", "atb", "dim"]
    stationType : getParamValue("stationtype"), // 1 for dams, 2 for stations
    stationName : decodeURIComponent(getParamValue("stationname")), // used for chartTitle, one of ["High Aswan", "Dongola", "Gabal Al Awlia", "Al Khartoom", "Malkal", "Rosiers", "Sennar", "Atbara", "El Diem"]
    riverName   : decodeURIComponent(getParamValue("rivername"))    // used for chartTitle, one of ["Blue%20Nile", "Main%20Nile", "White%20Nile"]
};

function dataLoader(csvDataType) {
    // For reading The text Data files.
    // csvDataType is one of ["Lvl", "Dis", "Vol", "Rle"]
    dataset = ""
    $.ajax({
        type: "GET",
        url: "data/" + csvDataType + "_" + urlData.outputName ,
        async: false,
        dataType: "text",
        success: function (data) {
            dataset = String(data);
        },
    });
    return dataset;
};

function dataParser(dataType) {
    let parsedData = []
    textdata = dataLoader(dataType);
    lines = textdata.split('\n');
    for (i = 1; i < lines.length; i++) {
        let items = lines[i].split(',');
        // parsedData.push([items[0], +items[1]]);
        let date1 = items[0].slice(0, 4) + "-" + items[0].slice(4, 6) + "-" + items[0].slice(6, 8);
        let date2 = new Date(date1).getTime();
        // let val1 = +items[1];  // converts string to number, but assumes gaps are zeros (bad for our case!)
        // if (val1 == 0) {val1 = NaN;}
        (items[1] == '') ? (val1 = NaN) : (val1 = +items[1]);
        parsedData.push([date2, val1]);
    }
    return parsedData;
};

function fieldSetup(bottonType) {
    // bottonType is one of ["Lvl", "Dis", "Vol", "Rle"]

    document.getElementById("btnLvl").className = 'button alt fit small';
    document.getElementById("btnDis").className = 'button alt fit small stationsButtons';
    // document.getElementById("btnVol").className = 'button alt fit small';
    document.getElementById("btnRle").className = 'button alt fit small reservoirButtons';

    document.getElementById(bottonType).classList.remove("alt");

    if (urlData.stationType == '1') {
        document.querySelectorAll(".stationsButtons").forEach(x=>x.style.display = "none"); // BEAUTIFUL!!
    }
    else if (urlData.stationType == '2') {
        document.querySelectorAll(".reservoirButtons").forEach(x=>x.style.display = "none"); // BEAUTIFUL!!
    }
};

// Button Functions: Customizing Buttons, Parsing Text Data, Plotting Data:

function loadLvl() { // Reservoir/Station US Water Levels

    fieldSetup("btnLvl");

    // document.getElementById("note").innerHTML='cvb';
    //document.getElementById("container").style.color = "#000000";

    $.ajax({
        success: function () {

            var level = dataParser("Lvl");
            
            // alert(level);

            ///////////// Condition for Station Type ///////////////////////////

            var chartTitle = [];
            var chartSubtitle = [];
            var chartSeries = [];

            if (urlData.stationType == '1') {

                
                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                chartTitle = {
                    text: "<strong>" + urlData.stationName + " Dam </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "US Water Level" ,
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'US Water Level',
                        data: level,
                        type: 'spline',
                        visible: true,
                        showInLegend: true,
                        marker: {enabled: false},
                        color: 'green',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },

                ];

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },
                    },

                    title: chartTitle,
                    
                    subtitle: chartSubtitle,

                    series: chartSeries,

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }
                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Elevation AMSL (m)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }

            else if (urlData.stationType == '2') {
                
                
                // document.getElementById("btnlevel" ).className = 'button     fit small';
                // document.getElementById("btninflow").className = 'button alt fit small';
                
                //var theDiv = document.getElementById("note");
                //var content = document.createTextNode("Note");
                //theDiv.appendChild(content);

                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });
                
                chartTitle = {
                    text: "<strong>" +  urlData.stationName + " Station </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "Station Water Level",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };
                chartSeries = [
                    {
                        name: 'Water Levels',
                        data: level,
                        type: 'spline',
                        marker: {enabled: false},
                        color: 'green',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },

                    // {
                    //   name: 'Level Climatology',
                    //   data: levelAVG,
                    //   type: 'spline',
                    //   dashStyle: 'Dot',
                    //   visible: true,
                    //   marker: {enabled: false},
                    //   color: Highcharts.getOptions().colors[0],
                    //   zIndex: 1,
                    //   states: {hover: {lineWidthPlus: 0}}},
                    //   {name: 'Standard Deviation of Level',
                    //   data: levelRange,
                    //   type: 'arearange',
                    //   fillOpacity: 0.3,
                    //   zIndex: 0,
                    //   lineWidth: 0,
                    //   linkedTo: ':previous',
                    //   visible: true,
                    //   color: Highcharts.getOptions().colors[0],
                    //   marker: {enabled: false},
                    // },

                ]

                /////////////// Plot the chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },

                    title: chartTitle,

                    subtitle: chartSubtitle,

                    series: chartSeries,

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months

                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Elevation AMSL (m)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                    },

                    credits: {
                        enabled: false
                    },

                });

            }
        }
    })
};

function loadDis() { // Reservoir/Station Inflow

    fieldSetup("btnDis");
    
    //document.getElementById("note").innerHTML='';
    //document.getElementById("container").style.color = "#000000";

    $.ajax({
        success: function () {
            
            var discharge = dataParser("Dis");
            
            // var inflowRange = []

            // var inflowAVG = []


            ///////////// Condition for Station Type ///////////////////////////

            var chartTitle = [];
            var chartSubtitle = [];
            var chartSeries = [];

            if (urlData.stationType == '1') {
                
                
                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                chartTitle = {
                    text: "<strong>" + urlData.stationName + " Dam </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "Discharge",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'Discharge',
                        data: discharge,
                        type: 'spline',
                        visible: true,
                        showInLegend: true,
                        marker: {enabled: false},
                        color: 'green',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },

                    // { 
                    //       name: 'Inflow Climatology',
                    //       data: inflowAVG,
                    //       type: 'spline',
                    //       visible: true,
                    //       dashStyle: 'Dot',
                    //       showInLegend: true,
                    //       marker: { enabled: false },
                    //       color: Highcharts.getOptions().colors[0],
                    //       zIndex: 1,
                    //       states: { hover: { lineWidthPlus: 0 } }
                    //   },

                    //   {
                    //       name: 'Standard Deviation of Reservoir Inflow',
                    //       data: inflowRange,
                    //       type: 'arearange',
                    //       fillOpacity: 0.3,
                    //       zIndex: 0,
                    //       lineWidth: 0,
                    //       linkedTo: ':previous',
                    //       visible: true,
                    //       color: Highcharts.getOptions().colors[0],
                    //       marker: { enabled: false },
                    //   },

                ];

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },

                    title: chartTitle,

                    subtitle: chartSubtitle,

                    series: chartSeries,

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Discharge (m3/sec)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }

            else if (urlData.stationType == '2') {
                
                // document.getElementById("btnlevel"  ).className = 'button alt fit small';
                // document.getElementById("btninflow" ).className = 'button     fit small';

                //var theDiv = document.getElementById("note");
                //var content = document.createTextNode("Note ");
                //theDiv.appendChild(content);

                chartTitle = {
                    text: "<strong>" +  urlData.stationName + " Station </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text:  "Station Discharge",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'Discharge',
                        data: discharge,
                        type: 'spline',
                        marker: {enabled: false},
                        color: 'green',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },

                    // {name: 'Inflow Climatology',
                    //   data: inflowAVG,
                    //   type: 'spline',
                    //   dashStyle: 'Dot',
                    //   visible: true,
                    //   marker: {enabled: false},
                    //   color: Highcharts.getOptions().colors[0],
                    //   zIndex: 1,
                    //   states: {hover: {lineWidthPlus: 0}}},
                    //   {name: 'Standard Deviation of Inflow',
                    //   data: inflowRange,
                    //   type: 'arearange',
                    //   fillOpacity: 0.3,
                    //   zIndex: 0,
                    //   lineWidth: 0,
                    //   linkedTo: ':previous',
                    //   visible: true,
                    //   color: Highcharts.getOptions().colors[0],
                    //   marker: {enabled: false},
                    //   },

                ]

                /////////////// Plot the chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },

                    title: chartTitle,
                   
                    subtitle: chartSubtitle,

                    series: chartSeries,

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months

                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Discharge (m3/sec)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                    },
                    credits: {
                        enabled: false
                    },

                });

            }

        },

    });

};

function loadVol() { // Reservoir Storage

    fieldSetup("btnVol");

    //document.getElementById("note").innerHTML='';
    //document.getElementById("container").style.color = "#000000";

    $.ajax({
        success: function () {

            var volume = dataParser("Vol");

            // var storageRange = []

            // var storageAVG = []


            ///////////// Condition for Station Type ///////////////////////////

            var chartTitle = [];
            var chartSubtitle = [];
            var chartSeries = [];

            if (urlData.stationType == '1') {
                
                // document.getElementById('reservoirButtons').style.display = 'block';
                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                chartTitle = {
                    text: "<strong>" + urlData.stationName + " Dam </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "Volumes",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'Volume',
                        data: volume,
                        type: 'spline',
                        visible: true,
                        showInLegend: true,
                        marker: {enabled: false},
                        color: 'black',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },


                    // {
                    //      name: 'Climatology',
                    //      data: storageAVG,
                    //      type: 'spline',
                    //      dashStyle: 'Dot',
                    //      visible: false,
                    //      marker: { enabled: false },
                    //      color: Highcharts.getOptions().colors[0],
                    //      zIndex: 1,
                    //      states: {hover: {lineWidthPlus: 0}}
                    //   },

                    //   {
                    //      name: 'Standard Deviation of Reservoir Storage Change',
                    //      data: storageRange,
                    //      type: 'arearange',
                    //      fillOpacity: 0.3,
                    //      zIndex: 0,
                    //      lineWidth: 0,
                    //      linkedTo: ':previous',
                    //      visible: false,
                    //      color: Highcharts.getOptions().colors[0],
                    //      marker: { enabled: false },
                    //   },

                ];

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },
                    
                    title: chartTitle,

                    subtitle: chartSubtitle,

                    series: chartSeries,
                    
                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Volumes (BCM)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "km3"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                        //width:800,
                        //itemwidth:400,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }

            
            if (urlData.stationType == '2') {

                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                chartTitle = {
                    text: "<strong>" + urlData.stationName + " Station </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "Volumes",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'Volume',
                        data: volume,
                        type: 'spline',
                        visible: true,
                        showInLegend: true,
                        marker: {enabled: false},
                        color: 'black',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },


                    // {
                    //      name: 'Climatology',
                    //      data: storageAVG,
                    //      type: 'spline',
                    //      dashStyle: 'Dot',
                    //      visible: false,
                    //      marker: { enabled: false },
                    //      color: Highcharts.getOptions().colors[0],
                    //      zIndex: 1,
                    //      states: {hover: {lineWidthPlus: 0}}
                    //   },

                    //   {
                    //      name: 'Standard Deviation of Reservoir Storage Change',
                    //      data: storageRange,
                    //      type: 'arearange',
                    //      fillOpacity: 0.3,
                    //      zIndex: 0,
                    //      lineWidth: 0,
                    //      linkedTo: ':previous',
                    //      visible: false,
                    //      color: Highcharts.getOptions().colors[0],
                    //      marker: { enabled: false },
                    //   },

                ];

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },
                    
                    title: chartTitle,

                    subtitle: chartSubtitle,

                    series: chartSeries,
                    
                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Volumes (BCM)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "km3"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                        //width:800,
                        //itemwidth:400,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }
        },

    });

};

function loadRle() { // Reservoir Area Elevation Curve (Not the [discharge Stage] rating curve!)

    fieldSetup("btnRle");

    //document.getElementById("note").innerHTML='';
    //document.getElementById("container").style.color = "#000000";

    $.ajax({
        success: function () {
            
            var release = dataParser("Rle");

            ///////////// Condition for Station Type ///////////////////////////

            var chartTitle = [];
            var chartSubtitle = [];
            var chartSeries = [];

            if (urlData.stationType == '1') {
                
                
                /////////// Plot the Chart

                Highcharts.setOptions({
                    global: {
                        useUTC: false
                    }
                });

                chartTitle = {
                    text: "<strong>" + urlData.stationName + " Dam </strong>" + " (" + urlData.riverName + ")",
                    style: {
                        font: '20px bold Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSubtitle = {
                    text: "Release",
                    style: {
                        font: '18px Times New Roman, sans-serif',
                        color: "#000000"
                    }
                };

                chartSeries = [
                    {
                        name: 'Release',
                        data: release,
                        type: 'spline',
                        visible: true,
                        showInLegend: false,
                        marker: {enabled: false},
                        color: 'green',
                        zIndex: 1,
                        states: {hover: {lineWidthPlus: 0}}
                    },
                ];

                var chart = Highcharts.chart('container', {
                    chart: {
                        zoomType: 'x',
                        panning: true,
                        panKey: 'shift',

                        style: {
                            fontFamily: 'serif',
                            fontSize: '12px',
                            color: "#000000"
                        },

                    },

                    title: chartTitle,

                    subtitle: chartSubtitle,

                    series: chartSeries,

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        // type: 'category',
                        // tickInterval: 2,
                        title: {
                            text: 'Date',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        }

                    },
                    yAxis: {
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        title: {
                            text: 'Release (MCM)',
                            style: {
                                font: '16px bold Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        labels: {
                            format: '{value:.1f}',
                            style: {
                                font: '16px Times New Roman, sans-serif',
                                color: "#000000"
                            }
                        },
                        minTickInterval: 0.1
                    },
                    tooltip: {
                        //xDateFormat: '%d-%m-%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 1,
                        valueSuffix: "m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: false,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'horizontal',
                        alignColumns: true,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }
        }
    })
};
