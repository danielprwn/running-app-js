$(document).one("pageinit", function () {
  showRuns();

  // Add Edit Delete Set Clear Handler
  $("#submitAdd").on("tap", addRun);

  $("#submitEdit").on("tap", editRun);

  $("#stats").on("tap", "#deleteLink", deleteRun);

  $("#stats").on("tap", "#editLink", setCurrent);

  $("#clearRuns").on("tap", clearRuns);

  // Show all runs
  function showRuns() {
    var runs = getRunsObject();

    // Check if empty
    if (runs != "" && runs != null) {
      for (var i = 0; i < runs.length; i++) {
        $("#stats").append(
          '<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>' +
            runs[i]["date"] +
            " <br><strong>Distance: </strong>" +
            runs[i]["miles"] +
            'm<div class="controls">' +
            '<a href="#edit" id="editLink" data-miles="' +
            runs[i]["miles"] +
            '" data-date="' +
            runs[i]["date"] +
            '">Edit</a> | <a href="#" id="deleteLink" data-miles="' +
            runs[i]["miles"] +
            '" data-date="' +
            runs[i]["date"] +
            '" onclick="return confirm(\'Are You Sure?\')">Delete</a></li>'
        );
      }
      $("#home").bind("pageinit", function () {
        $("#stats").listview("refresh");
      });
    } else {
      $("#stats").html("<p>You have no logged runs</p>");
    }
  }

  //Add a run
  function addRun() {
    // Get form values
    var miles = $("#addMiles").val();
    var date = $("#addDate").val();

    // Create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles),
    };

    var runs = getRunsObject();

    // Add run to runs array
    runs.push(run);
    alert("Run Added");
    localStorage.setItem("runs", JSON.stringify(runs));
    window.location.href = "index.html";
    return false;
  }

  //Edit run
  function editRun() {
    currentMiles = localStorage.getItem("currentMiles");
    currentDate = localStorage.getItem("currentDate");

    var runs = getRunsObject();

    for (var i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    // Form values
    var miles = $("#editMiles").val();
    var date = $("#editDate").val();

    // Update run
    var update_run = {
      date: date,
      miles: parseFloat(miles),
    };

    runs.push(update_run);

    alert("Run Updated");

    // Set stringified object to localStorage
    localStorage.setItem("runs", JSON.stringify(runs));
    window.location.href = "index.html";
    return false;
  }

  function clearRuns() {
    localStorage.removeItem("runs");
    $("#stats").html("<p>You have no logged runs</p>");
  }

  //Delete run
  function deleteRun() {
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    // Get data
    currentMiles = localStorage.getItem("currentMiles");
    currentDate = localStorage.getItem("currentDate");

    var runs = getRunsObject();

    // Loop runs
    for (var i = 0; i < runs.length; i++) {
      if (runs[i].miles == currentMiles && runs[i].date == currentDate) {
        runs.splice(i, 1);
      }
      localStorage.setItem("runs", JSON.stringify(runs));
    }

    alert("Run Deleted");
    window.location.href = "index.html";

    return false;
  }

  //Get the runs object
  function getRunsObject() {
    var runs = new Array();
    var currentRuns = localStorage.getItem("runs");

    if (currentRuns != null) {
      var runs = JSON.parse(currentRuns);
    }

    // Return runs object
    return runs.sort(function (a, b) {
      return new Date(b.date) - new Date(a.date);
    });
  }

  // Clicked miles and date
  function setCurrent() {
    localStorage.setItem("currentMiles", $(this).data("miles"));
    localStorage.setItem("currentDate", $(this).data("date"));

    // Insert form fields
    $("#editMiles").val(localStorage.getItem("currentMiles"));
    $("#editDate").val(localStorage.getItem("currentDate"));
  }
});
