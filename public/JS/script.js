//Light Blue #0DC0FF


$(document).ready(function() {


    $('#thankyouBlock').hide();

    $('#someForm').on('submit', function(e) {
        e.preventDefault();

        //get the name field value
        //var name = $('#name').val();
        //get the name field value
        var email = $('#email').val();
        //get the comments
        //var comments = $('#comments').val();

        //pretend we don't need validation

        //send to formspree
        $.ajax({
            url:'https://formspree.io/rogelio.vg@icloud.com',
            method:'POST',
            data:{
                name:name,
                _replyto:email,
                 email:email,
                //comments:comments,
                _subject:'Robin Submission',
            },
            dataType:"json",
            success:function() {
                console.log('success');
                $('#someForm').hide();
                $('#thankyouBlock').show();
            }

        });

    });



});
