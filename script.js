// ==UserScript==
// @name         Showdown Backupper
// @namespace    https://fulllifegames.com/Tools/ShowdownBackupper
// @description  This script aims to create an easy backup for your Showdown teams.
// @author       FullLifeGames
// @include      http://play.pokemonshowdown.com/
// @include      https://play.pokemonshowdown.com/
// @include      http://play.pokemonshowdown.com/*
// @include      https://play.pokemonshowdown.com/*
// @include      http://*.psim.us/
// @include      https://*.psim.us/
// @include      http://*.psim.us/*
// @include      https://*.psim.us/*
// @version      0.0.2
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {

    var identifier = "#room-teambuilder > div.teampane > p:nth-child(6)";

    function getDateTime() {
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        return date+' '+time;
    }

    function downloadString(text, fileType, fileName) {
        var blob = new Blob([text], { type: fileType });

        var a = document.createElement('a');
        a.download = fileName;
        a.href = URL.createObjectURL(blob);
        a.dataset.downloadurl = [fileType, a.download, a.href].join(':');
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 1500);
    }

    function clickEvent() {
        var teams = localStorage.getItem("showdown_teams");
        downloadString(teams, "text/plain;charset=utf-8;", "teamBackup" + getDateTime() + ".txt");
    }

    function setButton() {
        const backupButton = $('<button/>', {
            id: 'backup',
            text: 'Backup',
            click: clickEvent,
            class: 'button small',
            style: 'margin-left: 4px;',
        });
        $(identifier + ' > button:nth-child(2)').after(backupButton);
    }

   function bootstrap() {
       if ($(identifier + " > #backup").length === 0) {
           setButton();
       }
        setTimeout(bootstrap, 1000);
    }

    bootstrap();
})();
