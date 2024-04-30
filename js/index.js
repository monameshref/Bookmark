

var siteNameInput = document.getElementById("siteNameInput");
var siteUrlInput = document.getElementById("siteUrlInput");
var searchInput = document.getElementById("searchInput");


var siteList = [];


// يعني فيها data
if (localStorage.getItem("website") != null ) {

    siteList = JSON.parse(localStorage.getItem("website")) ;

    displayData();

}



function addSite() {

    if( validationName() == true &&  validationUrl() == true ) {

        var site = {
            name : siteNameInput.value,
            url : siteUrlInput.value
        }

        siteList.push(site);
        localStorage.setItem("website" , JSON.stringify(siteList));
        clear();
        displayData();

        siteNameInput.classList.remove("is-valid")
        siteUrlInput.classList.remove("is-valid")
    }


    else {
        
        Swal.fire({
            title: "Name or URL is not valid!",

            text: `please follow the rules :
            site name must contain at least 3 characters .
            the url must start with either http or https followed by :
            it must contain www.followed by subdomain of length ( 2 , 256 )
            last part contains top level domain like .com , org  etc .`

        });

    }
    

}

function clear() {
    siteNameInput.value = "";
    siteUrlInput.value = "";
}

function displayData() {

    var showData = "";

    for ( var i = 0 ; i < siteList.length ; i++ ) {

        showData += `<tr>
                        <td> ${i + 1 } </td>
                        <td> ${siteList[i].name} </td>


                        <td>
                        <a href=" ${siteList[i].url}" target="_blank" >
                        <button class="btn btn-2 ">
                        <i class="fa-solid fa-eye pe-1"></i>Visit
                        </button>
                        </a>
                        </td>

                        <td>
                        <button class="btn btn-2 " onclick="deleteForm(${i})">
                        <i class="fa-solid fa-trash-can pe-1 "></i>
                        Delete
                        </button>
                        </td>

                    </tr>`
    }

    document.getElementById("tableBody").innerHTML = showData;
}

function deleteForm(index) {

    siteList.splice(index , 1);

    localStorage.setItem("website" , JSON.stringify(siteList));
    displayData();

}

function serchSite() {

    var term = searchInput.value;

    var showData = "";

    for ( var i = 0 ; i < siteList.length ; i++ ) {

        if(siteList[i].name.toLowerCase().includes( term.toLowerCase() ) ) {

            showData += `<tr>
            <td> ${i} </td>
            <td> ${siteList[i].name} </td>


            <td>
            <button class="btn btn-2 ">
            <i class="fa-solid fa-eye pe-1 "></i>Visit
            </button>
            </td>


            <td>
            <button class="btn btn-2 " onclick="deleteForm(${i})">
            <i class="fa-solid fa-trash-can pe-1 "></i>Delete
            </button>
            </td>
        </tr>`
}
        }

    document.getElementById("tableBody").innerHTML = showData;

}

function validationName() {

    var text = siteNameInput.value;
    var regexName = /^[A-z]{4,10}$/;


    if(regexName.test(text) == true ) {

        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    }

    else {
        siteNameInput.classList.add("is-invalid");
        siteNameInput.classList.add("is-valid");
        return false;

    }
}

function validationUrl() {

    var text = siteUrlInput.value;
    var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    // var regexUrl = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;



    if(regexUrl.test(text) == true ) {

        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;
    }

    else {
        siteUrlInput.classList.add("is-invalid");
        siteUrlInput.classList.add("is-valid");
        return false;
    }
}