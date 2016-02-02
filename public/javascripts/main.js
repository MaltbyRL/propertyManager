"use strict";

$(document).ready(init);

function init() {
  hideInput()
  propagateDom()
  $('#button').on("click", showInput);
  $("#sendButton").on('click', fuckingDoIt);
  $('.container').on('dblclick', '.yessir', deleteRow)
}


var full = false;
var tenantList;

function deleteRow(){
  var _id = $(this).attr('data-info')
  console.log(_id);
  $.post('/removeTenant', {_id: _id})
  .done(function(data){
    propagateDom()
  })
}

function fuckingDoIt(e){
  e.preventDefault
  console.log('Clicked');
 var firstName = $("#firstName").val();
 var lastName = $("#lastName").val();
 var credit = $("#credit").val();
 credit = credit.toLowerCase()
 if (credit === 'good' || credit === 'bad' || credit === 'terrible'){

   $.post("/tenant", {
      first: firstName,
      last: lastName,
      credit: credit
    }).done(function(data){
    // envoke refresh page
      $("#firstName, #lastName, #credit, #sendButton").hide();
      $("#button").show();
      console.log('dataX: ', data);
      propagateDom()
    })
  }else{
  return alert('credit must equal good, bad or terrible!')
  }
}


function makeFuckingApartment() {
  if(!full){
    return console.log("apatment not full");
    $('.tenantInfo').text()
  }else{

  }
};

function showInput() {
  $("#firstName, #lastName, #credit, #sendButton").show();
  $("#button").hide();
}
function hideInput() {
  $("#firstName, #lastName, #credit, #sendButton").hide()
}

function propagateDom(){
  $('.yessir').remove();

  $.get('/getShit')

  .done(function(data){
    var image = [
    '<img src = "https://t1.ftcdn.net/jpg/00/83/67/60/240_F_83676089_EkBu2BpEJsRqp8ixewBuQTyfCOYbQT3U.jpg"> King ',
    '<img src = "https://s-media-cache-ak0.pinimg.com/236x/3d/ca/79/3dca798466f58afabf2b7e52013e7ea5.jpg"> Queen '
  ];
    var newApartment = $(".container").append($('.row'))
    var apartNum = 0;
    var tenantArray = []
    for(var i = 0; i < data.length; i++){
      var apartmentPic = Math.floor(Math.random() * 2)
      var addPrice = 450.00 + Math.floor(Math.random() * 100);
      var firstName = data[i].name.first
      var lastName = data[i].name.last
      var credit = data[i].credit
      var tenArr = [firstName, lastName, credit]
      var tenId = data[i]._id
      var $row = $('.template').clone();
      tenantArray.push(tenArr)
      console.log("TenID", tenId);


      $row.removeClass('template');
      $row.removeAttr('id');
      $row.attr('data-info', tenId);
      $row.addClass('yessir');
      $row.children('.diagram').html(image[apartmentPic]);
      $row.children('.tenantInfo').text("Tenent: " + firstName + " " + lastName + ", " + "Credit: " + credit)
      $row.children('.price').text("Rent & utilities $"+addPrice+".00")
      console.log('tenArr: ', tenArr);
      $('.container').append($row)

      tenantArray = []
      }

    // console.log("tenO: ", tenantArray)

    // data;
    // console.log(data);



})
}
