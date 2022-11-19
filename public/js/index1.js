$("document").ready(function() {
    $("form").submit(function() {
      console.log("submit clicked");
      $.ajax({
        type: "post",
        url: "notes/add-note",
        data: {
          note: $("form input").val()
        
        }
      });
    });
  
    $("button.remove").click(function() {
      console.log("remove clicked");
      if (confirm("Are you sure you want to delete?")) {
        let id = $(this).data("id");
  
        $.ajax({
          type: "delete",
          url: `notes/${id}`,
          success: function(res) {
            location.href = "/notes";
          }
        });
      }
    });
  
    $("button.edit").click(function() {
      console.log("edit clicked");
      let initial = $(this)
        .parent()
        .find("span")
        .text();
      let note = prompt("Edit the note: ", initial);
  
      if (note != null) {
        let id = $(this).data("id");
  
        $.ajax({
          type: "put",
          url: `notes/${id}`,
          data: {
            note: note
          },
          success: function(res) {
            location.href = "/notes";
          }
        });
      }
    });
  
   
   
  });
  