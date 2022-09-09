<!DOCTYPE html>

<html lang="en">

<head>
    @include('Template.head')
    <title>Laravel & Vue</title>
</head>

<body class="hold-transition sidebar-mini">
    <div class="wrapper" id="app">


        @include('Template.Navbar')

        @include('Template.Sidebar')

        <div class="content-wrapper">

            <div class="content">
                <div class="container-fluid">
                    <router-view></router-view>
                    <vue-progress-bar></vue-progress-bar>
                    <!-- <example-component></example-component> -->
                </div>
            </div>

        </div>
        @include('Template.footer')
    </div>
    @include('Template.script')
</body>

</html>