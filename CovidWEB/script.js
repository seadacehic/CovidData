// api url 
const api_url = 'https://api.covid19api.com/country/bosnia-and-herzegovina/status/confirmed/live?from=2020-03-01T00%3A00%3A00Z&to=2020-04-01T00%3A00%3A00Z&fbclid=IwAR0WboRJVf3RecSUOCmaVSppDmSsDnaLAH06CQoKMSze3oxkJWUOBfIPOu0';

async function getapi(url) {
    const response = await fetch(url);
    var data = await response.json();
    console.log(data);

    show(data);
}
getapi(api_url);

function show(data) {
    let numberOfRow = 0;
    let tab =
        `
        <thead>
        <tr> 
          <th>Country</th> 
          <th>CountryCode</th> 
          <th>Date</th> 
          <th>Status</th> 
          <th>Cases</th> 
          <th></th>
         </tr>
         </thead>
         `;
    for (let r of data) {
        tab +=
            `
    <tbody>
    <tr >  
    <td contenteditable id='txt1'>${r.Country}</td> 
    <td contenteditable id='txt2'>${r.CountryCode}</td> 
    <td contenteditable id='txt3'>${r.Date}</td> 
    <td contenteditable id='txt4'>${r.Status}</td>  
    <td contenteditable id='txt5'>${r.Cases}</td> 
    <td><a class='editbtn' value ='click' onclick='saveChanges();'>Edit</a>
   <a onclick="onDelete(this)">Delete</a></td>
    </tr></tbody>
    `;
    }
    document.getElementById("covid").innerHTML = tab;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("covid").deleteRow(row.rowIndex);
        resetForm();
    }
}

//exporting file insto excel 

function exporttable(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}
