
$("#json").on("click", function () {
    $("#covid").tableHTMLExport({
        type: 'json',
        filename: 'sample.json'
    });
});