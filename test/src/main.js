//import '/src/css/index.css'
import $ from 'jquery'

$(function(){
    $('li:odd').css('backgroundColor','lightblue')
    $('li:even').css('backgroundColor',function(){
        return '#'+'D97634'
    })
})