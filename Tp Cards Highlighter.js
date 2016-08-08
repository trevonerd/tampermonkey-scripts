// ==UserScript==
// @name        Tp Cards Highlighter
// @namespace   https://yoox.tpondemand.com/
// @include     https://yoox.tpondemand.com/RestUI/*
// @version     1.1
// @grant       none
// ==/UserScript==
// ==Options==
var loadingDelay = 5000;
var cardElement = $('.i-role-card');
var bugColor = '#FFE6EF';
var userStoryWithBugsColor = '#FFA55B';
var myUserStories = '#38B1F7';
var userNameSurname = 'Marco Trevisani';
// ==/Options==

function colorise() {
    // Colorize Bug Cards
    $('.tau-card-v2_type_bug').css('background-color', bugColor);
    
    // Colorize My User Stories
    $('.tau-avatar img[title="' + userNameSurname + '"]').parents('.tau-card-v2_type_userstory').css('backgroundColor', myUserStories);
    
    // Colorize My User Stories with Bugs
    $('.tau-entity-icon--bug').each(function() {
        var userStory = $(this).parents('.tau-card-v2_type_userstory');
        if(isAssignedToMe(userStory)) {
            userStory.css('backgroundColor', userStoryWithBugsColor);
        }
    });
}

function isAssignedToMe(element) {
    if (element.find('.tau-avatar img[title="' + userNameSurname + '"]').length) {
        return true;
    }
    return false;
};

function hasBugs(element) {
    $('.i-role-card').find('.tau-entity-icon--bug');
}

function add_button() {
    var new_button = $('<div class="tau-main-menu__item tau-menu-item-reports tau-user-menu tau-extension-board-tooltip"><span class="tau-icon-general tau-icon-reports icon-coffee"></span><span data-title="Colorize" class="tau-main-menu__label trevo-colorize">Colorize</span></div>');
    new_button.on('click', colorise);
    $('.tau-main-menu__section').first().prepend(new_button);
    addGlobalStyle('.icon-coffee:before { background-position: -618px -210px !important; }');
}

function addGlobalStyle(css) {
    var head,
    style;
    head = document.getElementsByTagName('head') [0];
    if (!head) {
        return;
    }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

$(document).ready(function () {
    setTimeout(function () {
        add_button();
    }, loadingDelay);
});


/*
tau-entity-icon--bug
tau-avatar img title="[**Nome Cognome**]"
.tau-ui-size-m .tau-card-v2_type_epic,
.tau-ui-size-m .tau-card-v2_type_feature,
.tau-ui-size-m .tau-card-v2_type_userstory,
.tau-ui-size-m .tau-card-v2_type_task,
.tau-ui-size-m .tau-card-v2_type_bug,
.tau-ui-size-m .tau-card-v2_type_request,
.tau-ui-size-m .tau-card-v2_type_testplanrun
*/