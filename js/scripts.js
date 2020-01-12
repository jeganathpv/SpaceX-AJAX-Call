
var spacex="";


const success=`<span style="color:green;font-weight: bold;">Success</span>`;
const failure=`<span style="color:red;font-weight: bold;">Failure</span>`;


var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        spacex = getdata(JSON.parse(this.responseText));
        // document.getElementById('reviews').innerHTML=product;
        
        updatedetails();
    }
};
xhttp.open("GET", "https://api.spacexdata.com/v2/launches", true);
xhttp.send();

function getdata(x){
    return x.map(function(i){
        return {
            flight_number : i.flight_number,
            mission_name : i.mission_name,
            launch_year : i.launch_year,
            launch_success:i.launch_success,
            links : i.links,
            rocket : i.rocket
        }
    });

}

function launch_status(x){
    if(x==true){
        return success;
    }
    return failure;
}

function createpagination(){
    const start=` <li class="prev disabled"><a href="#">&lt;</a></li>
    <li class="active"><a href="#">1</a></li>`;
    const end=` <li class="next"><a href="#">&gt;</a></li>`;
    let pagecount=1;
    if (spacex.length%10!=0){
        pagecount=(spacex.length/10)+1;
    }else{
        pagecount=(spacex.length/10);
    }
    let content=start;
    for(let i=2;i<=pagecount;i++){
        content+=`<li><a href="#">${i}</a></li>`;
    }
    content+=end;
    document.getElementById('page-format').innerHTML=content;
}

function updatedetails() {
    

    let data="";
    for (let i=0;i<spacex.length;i++){
        const template= `
<li class="list-group-item card">
                    <div class="row py-2">
                        <div class="col-3">
                            <img id="flightimage" class="rounded"
                                src="${spacex[i].links.mission_patch_small}"
                                alt="" srcset="">
                        </div>
                        <div class="col-6">
                            <h4 class="name_year">${spacex[i].mission_name} <span>(${spacex[i].launch_year})</span></h4>
                            Status: <span class="status">${launch_status(spacex[i].launch_success)}</span>
                            <div id="showmoredetails${i}" class="container-fluid p-0" style="display:none;">
                                <h5 for="">${spacex[i].rocket.rocket_name}</h5>
                                <div  class="row" >
                                    <div class="col-4">
                                        <h6>Cores: </h6>
                                        <ul>
                                            <li>
                                            ${spacex[i].rocket.first_stage.cores[0].core_serial}
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-4">
                                        <h6>Payloads: </h6>
                                        <ul>
                                            <li>
                                                ${spacex[i].rocket.second_stage.payloads[0].payload_id}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-3 py-4">
                            <button id="showbtn${i}" class="btn btn-info" onclick="showmoredetails(${i})">Show more</button>
                            <button id="hidebtn${i}" class="btn btn-info" onclick="hidemoredetails(${i})" style="display:none;">Hide</button>
                            <button class="btn btn-danger" onclick="deleteElement(${i})">Delete</button>
                        </div>
                    </div>
                </li>
`
         data+= template;
    }
    document.getElementById('listitems').innerHTML=data;

    // createpagination();
}

function showmoredetails(id){
    document.getElementById('showmoredetails'+id).style.display="";
    document.getElementById('showbtn'+id).style.display="none";
    document.getElementById('hidebtn'+id).style.display="";    
}

function hidemoredetails(id){
    document.getElementById('showmoredetails'+id).style.display="none";
    document.getElementById('showbtn'+id).style.display="";
    document.getElementById('hidebtn'+id).style.display="none";   

}


function searchcontent(){
    // Declare variables
  var input, filter, ul, li, a,b, i, txtValueA,txtValueB;
  input = document.getElementById('searchinput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("listitems");
  li = ul.getElementsByClassName('list-group-item');
  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName('name_year')[0];
    txtValueA = a.textContent || a.innerText;
    b= li[i].getElementsByClassName('status')[0];
    txtValueB = b.textContent || b.innerText;
    if (txtValueA.toUpperCase().indexOf(filter) > -1 || txtValueB.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
    
}

function deleteElement(no){          
    spacex.splice(no,1);
    updatedetails();

}