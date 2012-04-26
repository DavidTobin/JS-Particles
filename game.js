/**
    Game.js - A simple particle creation system.
    
    Author: David Tobin (@david-tobin)
**/

var Game = {
    
    c : null,
    ctx : null,
    width : 0,
    height : 0,
    mouse_x : 0,
    mouse_y : 0,
    speed : 5,
    generate : false,
    gravity : 0.985,
    particles : [],
    
    init : function(width, height) {
        this.width  = width;
        this.height = height;
        
        // Create canvas element.
        var body    = $("body");
        var html    = body.html();
        
        // Add the element
        html        += '<div class="center"><canvas id="game" width="' + width + '" height="' + height + '"></canvas></div>';
        
        body.html(html);
        
        this.c      = document.getElementById('game');
        this.ctx    = this.c.getContext('2d');
        
        // Run main
        this.main();
    },
    
    main : function() {
        console.log('Game is starting...');                        
        
        // Mouse Move Event
        /*this.ctx.canvas.addEventListener('mousemove', function(event) {
            Game.mouse_x = event.clientX;
            Game.mouse_y = event.clientY;                        
        }, false);*/
        
        this.ctx.canvas.addEventListener('mousemove', function(event) {
            var x;
            var y;
            
            if (event.pageX || event.pageY) { 
              x = event.pageX;
              y = event.pageY;
            }
            else { 
              x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
              y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
            } 
            x -= Game.c.offsetLeft;
            y -= Game.c.offsetTop;
            
            Game.mouse_x = x;
            Game.mouse_y = y;
        }, false);
        
        this.ctx.canvas.addEventListener('mousedown', function(event) {                                        
            Game.generate = true;                                            
        }, false);
        
        this.ctx.canvas.addEventListener('mouseup', function(event) {                    
            Game.generate   = false;
        }, false);
        
        // Draw screen
        setInterval('Game.generate_particle()', 30);                
    },
    
    generate_particle : function() {        
        // Create a new particle
        var particle = {
            x : this.mouse_x,
            y : this.mouse_y,
            xSpeed : this.randomRange(1, this.speed),
            ySpeed : this.randomRange(1, this.speed),
            size : Math.random()*11 % 4,
            angle : this.randomRange(20, 40),
            color : 'rgb(' + this.randomRange(200, 255) + ', ' + this.randomRange(0, 255) + ', ' + this.randomRange(0, 255) + ')'
            //color : 'cyan'
        };
        
        if (particle.xSpeed == 0 && particle.ySpeed == 0) {
            particle.xSpeed++;
        }
        
        if (this.generate == true) {
            this.particles.push(particle);
        }
        
        // Clear the screen
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        for (i=0; i<this.particles.length; i++) {
            if (this.particles[i].x > this.width && this.particles[i].y > this.height) {
                this.particles.shift(i, 1);
            }
            
            this.ctx.fillStyle = this.particles[i].color;  
            this.ctx.shadowColor = "white";
            this.ctx.shadowBlur = 15;
            this.ctx.shadowOffsetX = 1;
            this.ctx.shadowOffsetY = 1;          
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].x, this.particles[i].y, this.particles[i].size, 0, 2 * Math.PI, false);
            this.ctx.fill();
            //this.ctx.fillRect(this.particles[i].x - (this.particles[i].size / 2), this.particles[i].y - (this.particles[i].size / 2), this.particles[i].size, this.particles[i].size);
              
            this.ctx.globalCompositeOperation = 'lighter';
              
            // Gravity  
            var scale_x = Math.cos(this.particles[i].angle);
            var scale_y = Math.sin(this.particles[i].angle);                        
            
            if (this.particles[i].x == 0) {
                this.particles[i].x = this.particles[i].xSpeed * -1;
            }
            
            if (this.particles[i].y <= this.height) {
                this.particles[i].x += (scale_x * this.particles[i].xSpeed);
                this.particles[i].y += (scale_y * this.particles[i].ySpeed);
            }                    
        }      
    },
    
    draw : function() {
        //console.log('Drawing...');
        
        for (i=0; i<10; i++) {
            this.particle();
        }
    },
    
    randomRange : function(start, end) {
        return Math.floor(Math.random() * (end - start + 1) + start);
    },
    
    mouse_move : function(e) {
        console.log(this);
    }
      
};