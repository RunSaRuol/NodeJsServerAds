var express = require("express");
var app = express();
app.use(express.static("public"));
app.set( "view engine","ejs");
app.set("views","./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var mangAds =[
    new QuangCao("DoctorThanh.jpg","http://DoctorThanh.com"),
    new QuangCao("CoffeeHouse.jpg","http://CoffeeHouse.com"),
    new QuangCao("Volleyball.jpg","http://Volleyball.com"),
    new QuangCao("GoodMood.jpg","http://GoodMood.com")
];

io.on("connection",function(socket){
    console.log("co nguoi ket noi server, socket: " +socket.id);
    socket.on("admin_send_message", function(data){
        console.log(data);
        var l=TimLink(data);
        io.sockets.emit("server_send_quangcao", {hinh:data,link:l});
    });
});

app.get("/admin", function(req,res){
    res.render("admin", {mangQC:mangAds});

});
app.get("/web", function(req,res){
    res.render("web");

});

function TimLink(hinh){
    $kq ="";
    mangAds.forEach(function(qc){
        if(qc.Hinh==hinh){
            kq =qc.link;
            
        }

    });
    return kq;
}

function QuangCao(hinh,link){
    this.Hinh = hinh;
    this.Link = link;
}