(function init() {
    window.stData = {
        had  :   { stationType : 1  ,  stationName : "High Aswan",     riverName : "Main Nile"  },
        ros  :   { stationType : 1  ,  stationName : "Rosiers",        riverName : "Blue Nile"  },
        gab  :   { stationType : 1  ,  stationName : "Gabal Al Awlia", riverName : "White Nile" },
        sen  :   { stationType : 1  ,  stationName : "Sennar",         riverName : "Blue Nile"  },
        don  :   { stationType : 2  ,  stationName : "Dongola",        riverName : "Main Nile"  },
        khr  :   { stationType : 2  ,  stationName : "Al Khartoom",    riverName : "Blue Nile"  },
        mlk  :   { stationType : 2  ,  stationName : "Malkal",         riverName : "White Nile" },
        atb  :   { stationType : 2  ,  stationName : "Atbara",         riverName : "Main Nile"  },
        dim  :   { stationType : 2  ,  stationName : "El Diem",        riverName : "Blue Nile"  },
        tna  :   { stationType : 3  ,  stationName : "Tana",           riverName : "Blue Nile" , grealmID : "000402.10d"},
        vct  :   { stationType : 3  ,  stationName : "Victoria",       riverName : "White Nile", grealmID : "000314.10d"},
        tkz  :   { stationType : 3  ,  stationName : "Tekezé Dam",     riverName : "Atbara"    , grealmID : "001597.27b"},
        grd  :   { stationType : 3  ,  stationName : "GERD Dam",       riverName : "Blue Nile" , grealmID : "101296.27b"},
    };
    
    window.keyName  = new URLSearchParams(document.location.search).get("kn");  // used as a key and for file name, one of ["had", "don", "gab", "khr", "mlk", "ros", "sen", "atb", "dim", "tna", "vct", "tkz", "grd"]
    // for (const [key, value] of new URLSearchParams(window.location.search).entries()) {console.log(key, ' : ', value)}

    window.stationType = stData[keyName].stationType;  // 1 for dams, 2 for stations, 3 for Lakes, used for chart customization.
    window.stationName = stData[keyName].stationName;  // used for chartTitle, one of ["High Aswan", "Dongola", "Gabal Al Awlia", "Al Khartoom", "Malkal", "Rosiers", "Sennar", "Atbara", "El Diem"]
    window.riverName   = stData[keyName].riverName;    // used for chartTitle, one of ["Blue Nile", "Main Nile", "White Nile"]
    // alert(stData.keyName.stationName);
    
})();

function dataParser(csvDataType) {
    
    // For reading The text Data files.
    // csvDataType is one of ["Lvl", "Dis", "Vol", "Rle", "Lavg", "Lrng"]
    textdata = ""
    
    $.ajax({
        type: "GET",
        url: "data/" + csvDataType + "_" + keyName ,
        async: false,
        dataType: "text",
        success: function (data) {
            textdata = String(data);
        },
    });
    
    lines = textdata.split('\n');
    // alert(lines[0].split(','));
    
    let parsedData = []
    if (lines[0].split(',').length == 2) {  // date and single data point
        for (i = 1; i < lines.length; i++) {
            let items = lines[i].split(',');
            let date1 = items[0].slice(0, 4) + "-" + items[0].slice(4, 6) + "-" + items[0].slice(6, 8);
            let date2 = new Date(date1).getTime();
            (items[1] == '') ? (val1 = NaN) : (val1 = +items[1]);
            parsedData.push([date2, val1]);
        }
    }
    
    else {  // range file, date and more than one data point
        for (i = 1; i < lines.length; i++) {
            let items = lines[i].split(',');
            let date1 = items[0].slice(0, 4) + "-" + items[0].slice(4, 6) + "-" + items[0].slice(6, 8);
            let date2 = new Date(date1).getTime();
            (items[1] == '') ? (val1 = NaN) : (val1 = +items[1]);
            (items[2] == '') ? (val2 = NaN) : (val2 = +items[2]);
            parsedData.push([date2, val1, val2]);
        }
    }

    return parsedData;
};

function grealmParser(keyN, smoothed=false) {
    
    // For reading ipad text Data files.
    // keyN is the keyName (current lake) Passed to the function again!

    lakeID = stData[keyN].grealmID;
    let parsedData = []

    if (smoothed){
        fName = "lake" + lakeID + ".2.smooth.txt";
        startLine = 31;
        dateLoc = 0;
        valLoc = 4;
    } else {
        fName = "lake" + lakeID + ".2.txt";
        startLine = 51;
        dateLoc = 2;
        valLoc = 14;
    }

    $.ajax({
        type: "GET",
        url: "data/" +  fName,
        async: false,
        dataType: "text",
        success: function (data) {
            textdata = String(data);
            lines = textdata.split('\n');

            for (i = startLine; i < lines.length-1; i++) {
                line = lines[i].split(' ').filter(function (x) { return (x != '') }); // treat consecutive spaces as one by removing empty list items!
                
                if (line[dateLoc] == "99999999"){continue}; // empty date = no line at all!
                
                let date1 = line[dateLoc].slice(0, 4) + "-" + line[dateLoc].slice(4, 6) + "-" + line[dateLoc].slice(6, 8);
                let date2 = new Date(date1).getTime();
                
                (line[valLoc] == "9999.99") ? (val1 = NaN) : (val1 = +line[valLoc]);

                // console.log(date2, val1)
                parsedData.push([date2, val1]);
            }
        },
    });    
    return parsedData;
};

function hydrowebParser(keyN) {
    
    // For reading Hydroweb csv Data files.
    // keyN is the keyName (current lake) Passed to the function again!

    lakeID = stData[keyN].stationName.toLowerCase();
    let parsedData = []

    fName = "hydroprd_L_" + lakeID + ".csv";
    dateLoc = 1;
    valLoc = 3;

    $.ajax({
        type: "GET",
        url: "data/" +  fName,
        async: false,
        dataType: "text",
        success: function (data) {
            textdata = String(data);
            lines = textdata.split('\n');

            for (i = 1; i < lines.length-1; i++) {
                line = lines[i].split(',');

                let date1 = new Date(line[dateLoc]).getTime();

                (line[valLoc] == "9999.99") ? (val1 = NaN) : (val1 = +line[valLoc]);

                // console.log(date2, val1)
                parsedData.push([date1, val1]);
            }
        },
    });    
    return parsedData;
};

function yearShift(parsedData, amount=1) {

    // set current "Dam Year" start and end (ie: 1/7/2020 to 31/7/2021):
    // if today.month > 7 :
    //     start: 1/7/today.year
    //     end: 31/7/today.year+1
    // if today.month < 8 :
    //     start: 1/7/today.year-1
    //     end: 31/7/today.year

    var today = new Date();
    if (today.getMonth() > 6) { // January is 0, not 1
        var yrStart = new Date(today.getFullYear()  ,6,1);
        var yrEnd   = new Date(today.getFullYear()+1,6,31);
    }
    else // if we are in a month before Aug
    {
        var yrStart = new Date(today.getFullYear()-1,6,1);
        var yrEnd   = new Date(today.getFullYear()  ,6,31);
    }

    // console.log("these should be the current dam year start and end:")
    // console.log(new Date(yrStart));
    // console.log(new Date(yrEnd));


    // set backwards "Dam Year" start and end (ie: 1/7/2019 to 31/7/2020 if amount = 1):
    let rangeStart = yrStart.setFullYear(yrStart.getFullYear() - amount);
    let rangeEnd   = yrEnd.setFullYear(  yrEnd.getFullYear()   - amount);
    
    // console.log("these should be the previous dam year start and end:")
    // console.log(new Date(rangeStart));
    // console.log(new Date(rangeEnd));

    startIdx = parsedData.findIndex(rec => rec[0] >= rangeStart)
    endIdx   = parsedData.findIndex(rec => rec[0] >= rangeEnd  )

    // console.log("these should be the previous dam year start and end Indices, they should be 396 (365+31) days apart:")
    // console.log(startIdx);
    // console.log(endIdx);


    // For loop on daily data to add n years, but with this range:
    //     from  : array.find(start - n year)
    //     To    : array.find(end - n year)
    // Find a way to add/subtract a full year regardless of leap year

    // for (i = 0; i < parsedData.length; i++) {
        //  parsedData[i][0] += 31557600000*+amount
        // parsedData[i][0] += 31560000000*amount
        
    var shiftedRange = [];
    for (i = startIdx; i < endIdx; i++) {
        var oldDate = new Date(parsedData[i][0])
        var newDate = oldDate.setFullYear(oldDate.getFullYear() + amount);
        shiftedRange.push([newDate, parsedData[i][1]]);
    };
    // console.log(shiftedRange);
    return shiftedRange;
};

function fieldSetup(bottonType) {
    // bottonType is one of ["btnLvl", "btnDis", "btnVol", "btnRle", "btncmt"]

    document.querySelectorAll(".fakeButtons").forEach(x=>x.style.display = "none");
    
    // Temporarily disabling comment button:
    document.getElementById("btncmt").style.display = "none";

    document.getElementById("btnLvl").className = 'button alt fit small';
    document.getElementById("btnDis").className = 'button alt fit small stationsButtons';
    document.getElementById("btnRle").className = 'button alt fit small reservoirButtons';
    document.getElementById("btncmt").className = 'button alt fit small';

    document.getElementById(bottonType).classList.remove("alt");

    if (stationType == '1') {
        document.querySelectorAll(".stationsButtons").forEach(x=>x.style.display = "none"); // BEAUTIFUL!!
    }
    else if (stationType == '2') {
        document.querySelectorAll(".reservoirButtons").forEach(x=>x.style.display = "none");
    }
    else if (stationType == '3') {
        document.querySelectorAll(".stationsButtons").forEach(x=>x.style.display = "none");
        document.querySelectorAll(".reservoirButtons").forEach(x=>x.style.display = "none");
    }
};

function plotLvl() {

    fieldSetup("btnLvl");

    $.ajax({
        success: function () {
            
            if (stationType == '1') {                
                
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

                    title: {
                        text: "<strong>" + stationName + " Dam </strong>" + " (" + riverName + ")",
                        style: {
                            font: '20px bold Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },
                    
                    subtitle: {
                        text: "Observed US water level" ,
                        style: {
                            font: '18px Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    series: [
                        {
                            name: 'US Water Level',
                            data: dataParser("Lvl"),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            lineWidth: 3,
                            marker: {enabled: false},
                            color: 'darkblue',
                            connectNulls: true,
                            // shadow: true,
                            zIndex: 1,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
                        
                        {
                            name: 'Level Last Year',
                            data: yearShift(dataParser("Lvl")),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            marker: {enabled: false},
                            color: '#2b908fe0',
                            connectNulls: true,
                            zIndex: 0,
                            // dashStyle: 'LongDash', // Solid,ShortDash,ShortDot,ShortDashDot,ShortDashDotDot,Dot,Dash,LongDash,DashDot,LongDashDot,LongDashDotDot 
                            dashStyle: 'ShortDash',
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
                        
                        {
                            name: 'Level 2 Years Ago',
                            data: yearShift(dataParser("Lvl"),2),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            marker: {enabled: false},
                            color: '#FF90BFc0',
                            connectNulls: true,
                            zIndex: 0,
                            dashStyle: 'ShortDash',
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
                        
                        {
                            name: 'Level 3 Years Ago',
                            data: yearShift(dataParser("Lvl"),3),
                            type: 'spline',
                            visible: false,
                            showInLegend: true,
                            marker: {enabled: false},
                            color: '#456B41a0',
                            zIndex: 0,
                            dashStyle: 'ShortDash',
                            // dashStyle: 'ShortDot',
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
    
                    ],

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: (365+31) * 24 * 3600 * 1000, // show only last 13 months
                        // title: {
                        //     text: 'Date',
                        //     style: {
                        //         font: '16px bold Times New Roman, sans-serif',
                        //         color: "#000000"
                        //     }
                        // },
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
                            text: 'Level (m)',
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
                        enabled: true,
                        backgroundColor: {linearGradient: [0, 0, 0, 60],stops: [[0, '#FFFFFF'],[1, '#E0E0E0']]},
                        borderColor:  "#AAA",
                        borderRadius:  15,
                        borderWidth:  1,
                        distance: 50,
                        xDateFormat: '%d/%m/%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " m"
                    },

                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        alignColumns: true,
                        itemMarginBottom: 10,
                    },

                    credits: {
                        enabled: false
                    },

                });
            }

            else if (stationType == '2') {

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

                    title: {
                        text: "<strong>" +  stationName + " Station </strong>" + " (" + riverName + ")",
                        style: {
                            font: '20px bold Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    subtitle: {
                        text: "Observed station water levels",
                        style: {
                            font: '18px Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    series: [
                        {
                            name: 'Water Level',
                            data: dataParser("Lvl"),
                            type: 'spline',
                            connectNulls: true,
                            lineWidth: 3,
                            marker: {enabled: false},
                            color: 'darkblue',
                            zIndex: 1,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}}
                        },
    
                        {
                            name: 'Average Level',
                            data: dataParser("Lavg"),
                            type: 'spline',
                            connectNulls: true,
                            fillOpacity: 0.6,
                            // dashStyle: 'Dot',
                            visible: true,
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            color: Highcharts.getOptions().colors[0],
                            zIndex: 0,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                            // enableMouseTracking: false
                        },
    
                        {
                            name: 'Range',
                            data: dataParser("Lrng"),
                            type: 'arearange',
                            connectNulls: true,
                            fillOpacity: 0.5,
                            zIndex: 0,
                            lineWidth: 0,
                            dashStyle: 'Dash',
                            linkedTo: ':previous',
                            visible: true,
                            color: Highcharts.getOptions().colors[0],
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                            // enableMouseTracking: false
                        },
    
                    ],

                    xAxis: {
                        // crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        // title: {
                        //     text: 'Date',
                        //     style: {
                        //         font: '16px bold Times New Roman, sans-serif',
                        //         color: "#000000"
                        //     }
                        // },
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
                            text: 'Level (m)',
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
                        enabled: true,
                        backgroundColor: {linearGradient: [0, 0, 0, 60],stops: [[0, '#FFFFFF'],[1, '#E0E0E0']]},
                        borderColor:  "#AAA",
                        borderRadius:  15,
                        borderWidth:  1,
                        distance: 50,
                        xDateFormat: '%d/%m/%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " m"
                    },

                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        alignColumns: true,
                        itemMarginBottom: 10,
                    },

                    credits: {
                        enabled: false
                    },

                });

            }

            else if (stationType == '3') {

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

                    title: {
                        text: "<strong>" +  stationName + " Lake </strong>" + " (" + riverName + ")",
                        style: {
                            font: '20px bold Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    subtitle: {
                        text: "Altemetry Water levels",
                        style: {
                            font: '18px Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    series: [
                        {
                            name: 'GREALM',
                            data: grealmParser(keyName),
                            type: 'spline',
                            connectNulls: true,
                            visible: true,
                            marker: {enabled: true, symbol: 'circle', radius:2},
                            lineWidth: 0,
                            color: '#7cb5ec',
                            zIndex: 1,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}}
                        },
                        
                        {
                            name: 'GR MovAvg',
                            data: grealmParser(keyName, true),
                            type: 'spline',
                            connectNulls: true,
                            // dashStyle: 'Dot',
                            visible: true,
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            color: 'lightblue',
                            // color: Highcharts.getOptions().colors[0],
                            zIndex: 0,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                            // enableMouseTracking: false
                        },
                        
                        {
                            name: 'hydroWEB',
                            data: hydrowebParser(keyName),
                            type: 'spline',
                            connectNulls: true,
                            dashStyle: 'Dash',
                            visible: true,
                            marker: {enabled: true, symbol: 'circle', radius:2},
                            lineWidth: 0,
                            color: 'lightgreen',
                            // color: Highcharts.getOptions().colors[0],
                            zIndex: 0,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                            // enableMouseTracking: false
                        },
    
                    ],

                    xAxis: {
                        // crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 2 * 12 * 30 * 24 * 3600 * 1000, // show only last 2 years
                        // title: {
                        //     text: 'Date',
                        //     style: {
                        //         font: '16px bold Times New Roman, sans-serif',
                        //         color: "#000000"
                        //     }
                        // },
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
                            text: 'Level (m)',
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
                        enabled: true,
                        backgroundColor: {linearGradient: [0, 0, 0, 60],stops: [[0, '#FFFFFF'],[1, '#E0E0E0']]},
                        borderColor:  "#AAA",
                        borderRadius:  15,
                        borderWidth:  1,
                        distance: 50,
                        xDateFormat: '%d/%m/%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " m"
                    },

                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        alignColumns: true,
                        itemMarginBottom: 10,
                    },

                    credits: {
                        enabled: false
                    },

                });

            }
        }
    })
};

function plotDis() {

    fieldSetup("btnDis");

    $.ajax({
        success: function () {

            if (stationType == '2') { // no Reservoirs (type1) in discharge (was found redundunt and similar to release!)

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

                    title: chartTitle = {
                        text: "<strong>" +  stationName + " Station </strong>" + " (" + riverName + ")",
                        style: {
                            font: '20px bold Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },
                   
                    subtitle: {
                        text:  "Observed station discharge",
                        style: {
                            font: '18px Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    series: [
                        {
                            name: 'Discharge',
                            data: dataParser("Dis"),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            lineWidth: 3,
                            marker: {enabled: false},
                            color: 'darkblue',
                            zIndex: 1,
                            states: {hover: {lineWidthPlus: 0}}
                        },
    
                        // {name: 'Inflow average',
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
    
                    ],

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        // title: {
                        //     text: 'Date',
                        //     style: {
                        //         font: '16px bold Times New Roman, sans-serif',
                        //         color: "#000000"
                        //     }
                        // },
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
                        enabled: true,
                        backgroundColor: {linearGradient: [0, 0, 0, 60],stops: [[0, '#FFFFFF'],[1, '#E0E0E0']]},
                        borderColor:  "#AAA",
                        borderRadius:  15,
                        borderWidth:  1,
                        distance: 50,
                        xDateFormat: '%d/%m/%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " m3/sec"
                    },

                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        alignColumns: true,
                        itemMarginBottom: 10,
                    },
                    credits: {
                        enabled: false
                    },

                });

            };

        },

    });

};

function plotRle() {

    fieldSetup("btnRle");

    $.ajax({
        success: function () {

            if (stationType == '1') { // no Stations (type2) in release only Dams!

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

                    title: {
                        text: "<strong>" + stationName + " Dam </strong>" + " (" + riverName + ")",
                        style: {
                            font: '20px bold Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    subtitle: {
                        text: "Observed release",
                        style: {
                            font: '18px Times New Roman, sans-serif',
                            color: "#000000"
                        }
                    },

                    series: [
                        {
                            name: 'Release',
                            data: dataParser("Rle"),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            lineWidth: 3,
                            marker: {enabled: false},
                            color: 'darkblue',
                            zIndex: 1,
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
                        
                        {
                            name: 'Last Year\'s Release',
                            data: yearShift(dataParser("Rle")),
                            type: 'spline',
                            visible: true,
                            showInLegend: true,
                            marker: {enabled: false},
                            color: '#2b908fe0',
                            zIndex: 0,
                            dashStyle: 'ShortDash',
                            // dashStyle: 'LongDash', // Solid,ShortDash,ShortDot,ShortDashDot,ShortDashDotDot,Dot,Dash,LongDash,DashDot,LongDashDot,LongDashDotDot 
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },
    
                        {
                            name: 'Release 2 Years Ago',
                            data: yearShift(dataParser("Rle"),2),
                            type: 'spline',
                            visible: false,
                            showInLegend: true,
                            marker: {enabled: false},
                            color: '#FF90BFc0',
                            zIndex: 0,
                            dashStyle: 'ShortDash',
                            marker: {enabled: false, states: {hover: {enabled: false}}},
                            states: {hover: {lineWidthPlus: 0}, inactive: {opacity: 1}},
                        },

                    ],

                    xAxis: {
                        crosshair: true,
                        lineColor:'#B2BFB5',
                        lineWidth: 1,
                        type: 'datetime',
                        range: 12 * 30 * 24 * 3600 * 1000, // show only last 12 months
                        // type: 'category',
                        // tickInterval: 2,
                        // title: {
                        //     text: 'Date',
                        //     style: {
                        //         font: '16px bold Times New Roman, sans-serif',
                        //         color: "#000000"
                        //     }
                        // },
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
                        enabled: true,
                        backgroundColor: {linearGradient: [0, 0, 0, 60],stops: [[0, '#FFFFFF'],[1, '#E0E0E0']]},
                        borderColor:  "#AAA",
                        borderRadius:  15,
                        borderWidth:  1,
                        distance: 50,
                        xDateFormat: '%d/%m/%Y',
                        crosshairs: true,
                        shared: true,
                        valueDecimals: 2,
                        valueSuffix: " m3/sec"
                    },
                    legend: {
                        backgroundColor: '#FFFFFF',
                        borderColor: '#FCFFC5',
                        borderWidth: 1,
                        enabled:true,
                        floating: true,
                        align: 'right',
                        verticalAlign: 'top',
                        layout: 'vertical',
                        alignColumns: true,
                        itemMarginBottom: 10,
                    },

                    credits: {
                        enabled: false
                    },

                });
            };
        }
    })
};

function addComm() {
    fieldSetup("btncmt");
    document.getElementById("container").innerHTML =
        '<iframe id="" class="commFrame" src="./board.html?sn='+ stationName +'" scrolling="no"></iframe>';
    // I should find an alternative to all these nested iframes!!
};


// amCharts Color Theme:
// Magenta: #A367DC;
// Dark Blue: #6771DC;
// Lighter Blue: #6794DC;
// Baby Blue: #67B7DC;
// Grey: #DCDCDC;