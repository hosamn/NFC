var wms_layers = [];

var format_WorldBaseMap_0 = new ol.format.GeoJSON();
var features_WorldBaseMap_0 = format_WorldBaseMap_0.readFeatures(
    json_WorldBaseMap_0,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_WorldBaseMap_0 = new ol.source.Vector({
    attributions: "E. Hosam El-Nagar<br>Nile Forecast Center<br>Ministry of Water Resources and Irrigation",
});
jsonSource_WorldBaseMap_0.addFeatures(features_WorldBaseMap_0);
var lyr_WorldBaseMap_0 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_WorldBaseMap_0,
    style: style_WorldBaseMap_0,
    interactive: false,
    title: '<img src="styles/legend/WorldBaseMap_0.png" /> World Base Map',
});
var lyr_HeightMapSRTM_1 = new ol.layer.Image({
    opacity: 1,
    title: "Height Map (SRTM)",

    source: new ol.source.ImageStatic({
        url: "./layers/HeightMapSRTM_1.png",
        attributions: " ",
        projection: "EPSG:3857",
        alwaysInRange: true,
        imageExtent: [
            2306401.183668, -793048.697985, 4723712.636771, 3871465.418801,
        ],
    }),
});
var lyr_ShadingMapSRTM_2 = new ol.layer.Image({
    opacity: 1,
    title: "Shading Map (SRTM)",

    source: new ol.source.ImageStatic({
        url: "./layers/ShadingMapSRTM_2.png",
        attributions: " ",
        projection: "EPSG:3857",
        alwaysInRange: true,
        imageExtent: [
            2305882.446752, -794057.146093, 4723592.805458, 3872274.303361,
        ],
    }),
});
var format_Out_of_Basin_Shading_3 = new ol.format.GeoJSON();
var features_Out_of_Basin_Shading_3 =
    format_Out_of_Basin_Shading_3.readFeatures(json_Out_of_Basin_Shading_3, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
    });
var jsonSource_Out_of_Basin_Shading_3 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Out_of_Basin_Shading_3.addFeatures(features_Out_of_Basin_Shading_3);
var lyr_Out_of_Basin_Shading_3 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Out_of_Basin_Shading_3,
    style: style_Out_of_Basin_Shading_3,
    interactive: false,
    title:
        '<img src="styles/legend/Out_of_Basin_Shading_3.png" /> Out_of_Basin_Shading',
});
var format_WorldBorders_4 = new ol.format.GeoJSON();
var features_WorldBorders_4 = format_WorldBorders_4.readFeatures(
    json_WorldBorders_4,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_WorldBorders_4 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_WorldBorders_4.addFeatures(features_WorldBorders_4);
var lyr_WorldBorders_4 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_WorldBorders_4,
    style: style_WorldBorders_4,
    interactive: false,
    title: '<img src="styles/legend/WorldBorders_4.png" /> World Borders',
});
var format_Nile_Basin_Shading_5 = new ol.format.GeoJSON();
var features_Nile_Basin_Shading_5 = format_Nile_Basin_Shading_5.readFeatures(
    json_Nile_Basin_Shading_5,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_Nile_Basin_Shading_5 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Nile_Basin_Shading_5.addFeatures(features_Nile_Basin_Shading_5);
var lyr_Nile_Basin_Shading_5 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Nile_Basin_Shading_5,
    style: style_Nile_Basin_Shading_5,
    interactive: false,
    title:
        '<img src="styles/legend/Nile_Basin_Shading_5.png" /> Nile_Basin_Shading',
});
var format_Rivers_ClippedBy_Basin_6 = new ol.format.GeoJSON();
var features_Rivers_ClippedBy_Basin_6 =
    format_Rivers_ClippedBy_Basin_6.readFeatures(json_Rivers_ClippedBy_Basin_6, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
    });
var jsonSource_Rivers_ClippedBy_Basin_6 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Rivers_ClippedBy_Basin_6.addFeatures(
    features_Rivers_ClippedBy_Basin_6
);
var lyr_Rivers_ClippedBy_Basin_6 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Rivers_ClippedBy_Basin_6,
    style: style_Rivers_ClippedBy_Basin_6,
    interactive: false,
    title:
        '<img src="styles/legend/Rivers_ClippedBy_Basin_6.png" /> Rivers_ClippedBy_Basin',
});
var format_Nile_Main_CourseBG_7 = new ol.format.GeoJSON();
var features_Nile_Main_CourseBG_7 = format_Nile_Main_CourseBG_7.readFeatures(
    json_Nile_Main_CourseBG_7,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_Nile_Main_CourseBG_7 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Nile_Main_CourseBG_7.addFeatures(features_Nile_Main_CourseBG_7);
var lyr_Nile_Main_CourseBG_7 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Nile_Main_CourseBG_7,
    style: style_Nile_Main_CourseBG_7,
    interactive: false,
    title:
        '<img src="styles/legend/Nile_Main_CourseBG_7.png" /> Nile_Main_Course BG',
});
var format_Nile_Main_Course_8 = new ol.format.GeoJSON();
var features_Nile_Main_Course_8 = format_Nile_Main_Course_8.readFeatures(
    json_Nile_Main_Course_8,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_Nile_Main_Course_8 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Nile_Main_Course_8.addFeatures(features_Nile_Main_Course_8);
var lyr_Nile_Main_Course_8 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Nile_Main_Course_8,
    style: style_Nile_Main_Course_8,
    interactive: false,
    title: '<img src="styles/legend/Nile_Main_Course_8.png" /> Nile_Main_Course',
});
var format_NileBasinLakes_9 = new ol.format.GeoJSON();
var features_NileBasinLakes_9 = format_NileBasinLakes_9.readFeatures(
    json_NileBasinLakes_9,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_NileBasinLakes_9 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_NileBasinLakes_9.addFeatures(features_NileBasinLakes_9);
var lyr_NileBasinLakes_9 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_NileBasinLakes_9,
    style: style_NileBasinLakes_9,
    interactive: false,
    title: '<img src="styles/legend/NileBasinLakes_9.png" /> Nile Basin Lakes',
});
var format_BasinOutline_10 = new ol.format.GeoJSON();
var features_BasinOutline_10 = format_BasinOutline_10.readFeatures(
    json_BasinOutline_10,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_BasinOutline_10 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_BasinOutline_10.addFeatures(features_BasinOutline_10);
var lyr_BasinOutline_10 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_BasinOutline_10,
    style: style_BasinOutline_10,
    interactive: false,
    title: '<img src="styles/legend/BasinOutline_10.png" /> Basin Outline',
});
var format_Stations_11 = new ol.format.GeoJSON();
var features_Stations_11 = format_Stations_11.readFeatures(json_Stations_11, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
});
var jsonSource_Stations_11 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Stations_11.addFeatures(features_Stations_11);
var lyr_Stations_11 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Stations_11,
    style: style_Stations_11,
    interactive: true,
    title: '<img src="styles/legend/Stations_11.png" /> Stations',
});
var format_Reservoirs_12 = new ol.format.GeoJSON();
var features_Reservoirs_12 = format_Reservoirs_12.readFeatures(
    json_Reservoirs_12,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_Reservoirs_12 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Reservoirs_12.addFeatures(features_Reservoirs_12);
var lyr_Reservoirs_12 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Reservoirs_12,
    style: style_Reservoirs_12,
    interactive: true,
    title: '<img src="styles/legend/Reservoirs_12.png" /> Reservoirs',
});
var format_Map_OutlineClip_mask_13 = new ol.format.GeoJSON();
var features_Map_OutlineClip_mask_13 =
    format_Map_OutlineClip_mask_13.readFeatures(json_Map_OutlineClip_mask_13, {
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
    });
var jsonSource_Map_OutlineClip_mask_13 = new ol.source.Vector({
    attributions: " ",
});
jsonSource_Map_OutlineClip_mask_13.addFeatures(
    features_Map_OutlineClip_mask_13
);
var lyr_Map_OutlineClip_mask_13 = new ol.layer.Vector({
    declutter: true,
    source: jsonSource_Map_OutlineClip_mask_13,
    style: style_Map_OutlineClip_mask_13,
    interactive: false,
    title:
        '<img src="styles/legend/Map_OutlineClip_mask_13.png" /> Map_Outline (Clip_mask)',
});

lyr_WorldBaseMap_0.setVisible(true);
lyr_HeightMapSRTM_1.setVisible(true);
lyr_ShadingMapSRTM_2.setVisible(true);
lyr_Out_of_Basin_Shading_3.setVisible(true);
lyr_WorldBorders_4.setVisible(true);
lyr_Nile_Basin_Shading_5.setVisible(true);
lyr_Rivers_ClippedBy_Basin_6.setVisible(true);
lyr_Nile_Main_CourseBG_7.setVisible(true);
lyr_Nile_Main_Course_8.setVisible(true);
lyr_NileBasinLakes_9.setVisible(true);
lyr_BasinOutline_10.setVisible(true);
lyr_Stations_11.setVisible(true);
lyr_Reservoirs_12.setVisible(true);
lyr_Map_OutlineClip_mask_13.setVisible(true);
var layersList = [
    lyr_WorldBaseMap_0,
    lyr_HeightMapSRTM_1,
    lyr_ShadingMapSRTM_2,
    lyr_Out_of_Basin_Shading_3,
    lyr_WorldBorders_4,
    lyr_Nile_Basin_Shading_5,
    lyr_Rivers_ClippedBy_Basin_6,
    lyr_Nile_Main_CourseBG_7,
    lyr_Nile_Main_Course_8,
    lyr_NileBasinLakes_9,
    lyr_BasinOutline_10,
    lyr_Stations_11,
    lyr_Reservoirs_12,
    lyr_Map_OutlineClip_mask_13,
];
lyr_WorldBaseMap_0.set("fieldAliases", {
    fid: "fid",
    iso_a2: "iso_a2",
    NAME: "NAME",
    FIPS_10_: "FIPS_10_",
    ISO_A3: "ISO_A3",
    WB_A2: "WB_A2",
    WB_A3: "WB_A3",
});
lyr_Out_of_Basin_Shading_3.set("fieldAliases", { id: "id" });
lyr_WorldBorders_4.set("fieldAliases", {
    fid: "fid",
    iso_a2: "iso_a2",
    NAME: "NAME",
    FIPS_10_: "FIPS_10_",
    ISO_A3: "ISO_A3",
    WB_A2: "WB_A2",
    WB_A3: "WB_A3",
});
lyr_Nile_Basin_Shading_5.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    OBJECTID_1: "OBJECTID_1",
    REGION: "REGION",
    TRANSP: "TRANSP",
    Shape_Leng: "Shape_Leng",
    Shape_Area: "Shape_Area",
});
lyr_Rivers_ClippedBy_Basin_6.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    Strahler: "Strahler",
    TYPE_CODE: "TYPE_CODE",
    Rank: "Rank",
    Shape_Leng: "Shape_Leng",
    Type: "Type",
    RuleID: "RuleID",
    RuleID_1: "RuleID_1",
});
lyr_Nile_Main_CourseBG_7.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    Strahler: "Strahler",
    TYPE_CODE: "TYPE_CODE",
    Rank: "Rank",
    Shape_Leng: "Shape_Leng",
    Type: "Type",
    RuleID: "RuleID",
    RuleID_1: "RuleID_1",
});
lyr_Nile_Main_Course_8.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    Strahler: "Strahler",
    TYPE_CODE: "TYPE_CODE",
    Rank: "Rank",
    Shape_Leng: "Shape_Leng",
    Type: "Type",
    RuleID: "RuleID",
    RuleID_1: "RuleID_1",
});
lyr_NileBasinLakes_9.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    TYPE: "TYPE",
    WATER_TYPE: "WATER_TYPE",
    WATER_RANK: "WATER_RANK",
    Shape_Leng: "Shape_Leng",
    Shape_Area: "Shape_Area",
});
lyr_BasinOutline_10.set("fieldAliases", {
    OBJECTID: "OBJECTID",
    Id: "Id",
    MaxSimpTol: "MaxSimpTol",
    MinSimpTol: "MinSimpTol",
    InLine_FID: "InLine_FID",
    SmoLnFLag: "SmoLnFLag",
    RuleID: "RuleID",
    RuleID_1: "RuleID_1",
    Shape_Leng: "Shape_Leng",
});
lyr_Stations_11.set("fieldAliases", {
    N: "N",
    Type: "Type",
    "NFS Sys Na": "NFS Sys Na",
    "Excel Name": "Excel Name",
    Name: "Name",
    "Data Sourc": "Data Sourc",
    Longitude: "Longitude",
    Latitude: "Latitude",
});
lyr_Reservoirs_12.set("fieldAliases", {
    N: "N",
    Type: "Type",
    "NFS Sys Na": "NFS Sys Na",
    "Excel Name": "Excel Name",
    Name: "Name",
    "Data Sourc": "Data Sourc",
    Longitude: "Longitude",
    Latitude: "Latitude",
});
lyr_Map_OutlineClip_mask_13.set("fieldAliases", { id: "id" });
lyr_WorldBaseMap_0.set("fieldImages", {
    fid: "TextEdit",
    iso_a2: "TextEdit",
    NAME: "TextEdit",
    FIPS_10_: "TextEdit",
    ISO_A3: "TextEdit",
    WB_A2: "TextEdit",
    WB_A3: "TextEdit",
});
lyr_Out_of_Basin_Shading_3.set("fieldImages", { id: "TextEdit" });
lyr_WorldBorders_4.set("fieldImages", {
    fid: "TextEdit",
    iso_a2: "TextEdit",
    NAME: "TextEdit",
    FIPS_10_: "TextEdit",
    ISO_A3: "TextEdit",
    WB_A2: "TextEdit",
    WB_A3: "TextEdit",
});
lyr_Nile_Basin_Shading_5.set("fieldImages", {
    OBJECTID: "Range",
    OBJECTID_1: "Range",
    REGION: "TextEdit",
    TRANSP: "Range",
    Shape_Leng: "TextEdit",
    Shape_Area: "TextEdit",
});
lyr_Rivers_ClippedBy_Basin_6.set("fieldImages", {
    OBJECTID: "Range",
    Strahler: "Range",
    TYPE_CODE: "Range",
    Rank: "Range",
    Shape_Leng: "TextEdit",
    Type: "TextEdit",
    RuleID: "Range",
    RuleID_1: "Range",
});
lyr_Nile_Main_CourseBG_7.set("fieldImages", {
    OBJECTID: "Range",
    Strahler: "Range",
    TYPE_CODE: "Range",
    Rank: "Range",
    Shape_Leng: "TextEdit",
    Type: "TextEdit",
    RuleID: "Range",
    RuleID_1: "Range",
});
lyr_Nile_Main_Course_8.set("fieldImages", {
    OBJECTID: "Range",
    Strahler: "Range",
    TYPE_CODE: "Range",
    Rank: "Range",
    Shape_Leng: "TextEdit",
    Type: "TextEdit",
    RuleID: "Range",
    RuleID_1: "Range",
});
lyr_NileBasinLakes_9.set("fieldImages", {
    OBJECTID: "Range",
    TYPE: "Range",
    WATER_TYPE: "TextEdit",
    WATER_RANK: "Range",
    Shape_Leng: "TextEdit",
    Shape_Area: "TextEdit",
});
lyr_BasinOutline_10.set("fieldImages", {
    OBJECTID: "Range",
    Id: "Range",
    MaxSimpTol: "TextEdit",
    MinSimpTol: "TextEdit",
    InLine_FID: "Range",
    SmoLnFLag: "Range",
    RuleID: "Range",
    RuleID_1: "Range",
    Shape_Leng: "TextEdit",
});
lyr_Stations_11.set("fieldImages", {
    N: "TextEdit",
    Type: "TextEdit",
    "NFS Sys Na": "TextEdit",
    "Excel Name": "TextEdit",
    Name: "TextEdit",
    "Data Sourc": "TextEdit",
    Longitude: "TextEdit",
    Latitude: "TextEdit",
});
lyr_Reservoirs_12.set("fieldImages", {
    N: "TextEdit",
    Type: "TextEdit",
    "NFS Sys Na": "TextEdit",
    "Excel Name": "TextEdit",
    Name: "TextEdit",
    "Data Sourc": "TextEdit",
    Longitude: "TextEdit",
    Latitude: "TextEdit",
});
lyr_Map_OutlineClip_mask_13.set("fieldImages", { id: "TextEdit" });
lyr_WorldBaseMap_0.set("fieldLabels", {
    fid: "no label",
    iso_a2: "no label",
    NAME: "no label",
    FIPS_10_: "no label",
    ISO_A3: "no label",
    WB_A2: "no label",
    WB_A3: "no label",
});
lyr_Out_of_Basin_Shading_3.set("fieldLabels", { id: "no label" });
lyr_WorldBorders_4.set("fieldLabels", {
    fid: "no label",
    iso_a2: "no label",
    NAME: "no label",
    FIPS_10_: "no label",
    ISO_A3: "no label",
    WB_A2: "no label",
    WB_A3: "no label",
});
lyr_Nile_Basin_Shading_5.set("fieldLabels", {
    OBJECTID: "no label",
    OBJECTID_1: "no label",
    REGION: "no label",
    TRANSP: "no label",
    Shape_Leng: "no label",
    Shape_Area: "no label",
});
lyr_Rivers_ClippedBy_Basin_6.set("fieldLabels", {
    OBJECTID: "no label",
    Strahler: "no label",
    TYPE_CODE: "no label",
    Rank: "no label",
    Shape_Leng: "no label",
    Type: "no label",
    RuleID: "no label",
    RuleID_1: "no label",
});
lyr_Nile_Main_CourseBG_7.set("fieldLabels", {
    OBJECTID: "no label",
    Strahler: "no label",
    TYPE_CODE: "no label",
    Rank: "no label",
    Shape_Leng: "no label",
    Type: "no label",
    RuleID: "no label",
    RuleID_1: "no label",
});
lyr_Nile_Main_Course_8.set("fieldLabels", {
    OBJECTID: "no label",
    Strahler: "no label",
    TYPE_CODE: "no label",
    Rank: "no label",
    Shape_Leng: "no label",
    Type: "no label",
    RuleID: "no label",
    RuleID_1: "no label",
});
lyr_NileBasinLakes_9.set("fieldLabels", {
    OBJECTID: "no label",
    TYPE: "no label",
    WATER_TYPE: "no label",
    WATER_RANK: "no label",
    Shape_Leng: "no label",
    Shape_Area: "no label",
});
lyr_BasinOutline_10.set("fieldLabels", {
    OBJECTID: "no label",
    Id: "no label",
    MaxSimpTol: "no label",
    MinSimpTol: "no label",
    InLine_FID: "no label",
    SmoLnFLag: "no label",
    RuleID: "no label",
    RuleID_1: "no label",
    Shape_Leng: "no label",
});
lyr_Stations_11.set("fieldLabels", {
    N: "no label",
    Type: "no label",
    "NFS Sys Na": "inline label",
    "Excel Name": "inline label",
    Name: "header label",
    "Data Sourc": "header label",
    Longitude: "header label",
    Latitude: "header label",
});
lyr_Reservoirs_12.set("fieldLabels", {
    N: "no label",
    Type: "no label",
    "NFS Sys Na": "inline label",
    "Excel Name": "inline label",
    Name: "header label",
    "Data Sourc": "header label",
    Longitude: "header label",
    Latitude: "header label",
});
lyr_Map_OutlineClip_mask_13.set("fieldLabels", { id: "no label" });
lyr_Map_OutlineClip_mask_13.on("precompose", function (evt) {
    evt.context.globalCompositeOperation = "normal";
});
