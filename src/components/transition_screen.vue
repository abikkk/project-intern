<template>
    <div id="back">
        <div id="fore"></div>
        <h1>loading...</h1>
        this is a loading screen.
    </div>
</template>
 
 <script>
 export default {
     name: 'load_screen',
 };
 </script>
 
 <style>
    #back{
        background-image: url("../assets/logo.jpg");
        filter: blur(8px);
    }
    #fore{
        font-size: 20px;
    }
 </style>
 