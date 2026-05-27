  <template>
  <div class="contact-form-popups">
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Contact Us</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <div class="contact-form">

  <form @submit.prevent id="contactForm">


  <div class="form-row">
      <div class="col-xs-12 col-sm-6">
        <input type="text" class="form-control first-name" v-model="submission.firstname" placeholder="First name">
  <span class="error-message first-name-error">REQUIRED</span>
      </div>
      <div class="col-xs-12 col-sm-6">
        <input type="text" class="form-control last-name" v-model="submission.lastname" placeholder="Last name">
  <span class="error-message last-name-error">REQUIRED</span>
      </div>
  </div>
  <div class="form-row">
      <div class="col-xs-12 col-sm-6">
        <input type="text" class="form-control company" v-model="submission.company" placeholder="Company">
      </div>
      <div class="col-xs-12 col-sm-6">
        <input type="email" class="form-control email" name="email" id="email" v-model="submission.email" placeholder="Email">
  <span class="error-message email-error">REQUIRED</span>
      </div>
  </div>
  <div class="form-row">
  <p>I'm contacting the St. Pete Pint Guide because:</p>
  <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" v-model="submission.brewery" id="brewery">
          <label class="custom-control-label" for="brewery">I know of a brewery that should be added to the guide</label>
  </div>
  <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" v-model="submission.correction" id="correction">
          <label class="custom-control-label" for="correction">I see incorrect information about a brewery or beer that should be changed</label>
  </div>
  <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" v-model="submission.other" id="other">
          <label class="custom-control-label" for="other">Other reason</label>
  </div>
  </div>
  <div class="form-group">
      <label for="exampleFormControlTextarea1">Message</label>
      <textarea class="form-control message" v-model="message" id="text" rows="3"></textarea>
  <span class="error-message message-error">REQUIRED</span>
  </div>
  <div class="form-row">
  <button class="contact-submit-button" v-on:click.stop="checkForm()">Submit</button>
  </div>
  </form> 
  </div>
  </div>
  
  </div>
  </div>
  </div>

  <div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
  <div class="modal-content">
  <div class="modal-header">
  <h5 class="modal-title" id="exampleModalLabel">Message Sent!</h5>
  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
  <span aria-hidden="true">&times;</span>
  </button>
  </div>
  <div class="modal-body">
  <p>
  Thank you for your message. We'll be in touch as soon as possible.
</p>
  <button class="contact-submit-button end" type="button" data-dismiss="modal" aria-label="Close">
 Back to the Breweries
  </button>

  
  </div>
  <div class="modal-footer">
  </div>
  </div>
  </div>
  </div>
  </div>
  </template>


  <script>
  import $ from 'jquery'
  import firebase from 'firebase'
  import Vue from 'vue'

  export default {
  name: 'Contact',

  data() {
  return {
  errors: [],
  submission: {
  firstname: "",
  lastname: "",
  company: "", 
  email: "",
  brewery: false,
  correction: false,
  other: false

  },
  message: ""            
  }
  },
  methods: {  
  checkForm: function (e) {
  this.errors = [];

  if (!this.submission.firstname) {
  $('.first-name').addClass('error');
  $('.first-name-error').show();
  this.errors.push("First Name Required.");
  }
  if (!this.submission.lastname) {
  $('.last-name').addClass('error');
  $('.last-name-error').show();
  this.errors.push("Last Name Required.");
  }
  if (!this.submission.email) {
  $('.email').addClass('error');
  $('.email-error').show();
  this.errors.push('Email required.');
  }
  if (!this.message) {
  $('.message').addClass('error');
  $('.message-error').show();
  this.errors.push("Message Required.");
  }
  if (!this.errors.length) {
  this.onFormSubmit();
  }

  },             
  onFormSubmit(){
  // Reference messages collection
  var messagesRef = firebase.database().ref('messages');

  var firstname = this.submission.firstname;
  var lastname = this.submission.lastname;
  var company = this.submission.company;
  var email = this.submission.email;
  var brewery = this.submission.brewery;
  var correction = this.submission.correction;
  var other = this.submission.other;
  var message = this.message;

  if (this.errors.length == 0){
  // Save message
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
  firstname: firstname,
  lastname: lastname,
  company: company,
  email: email,
  brewery: brewery,
  correction: correction,
  other: other,
  message: message
  });
  $('#exampleModal').modal('hide');
  $('#exampleModal2').modal('show');
  $('#contactForm input').removeClass('error');
  $('.error-message').hide();
  this.submission.firstname =  '',
  this.submission.lastname =   '',
  this.submission.company =   '',
  this.submission.email =   '',
  this.submission.brewery =  false,
  this.submission.correction =   false,
  this.submission.other =   false,
  this.message =  ''
  }
  }
  }
  }
  </script>


