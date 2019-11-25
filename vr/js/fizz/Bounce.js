class Bounce extends Rule {
	constructor() {
		super();
		this.members = [];
    this.pi = 3.1415926;
    this.R = 0;
	}

	applyRule(){
		for (var i = 0; i < this.members.length-1; i++) {
			for (var j = i+1; j < this.members.length; j++) {
        if(this.testForCollision(this.members[i], this.members[j]) == "overlap"){
          this.collide(this.members[i], this.members[j]);
        }
			}
		}
	}

  testForCollision(particleA, particleB){

    var m1 = particleA.mass;
    var m2 = particleB.mass;
    var r1 = particleA.radius;
    var r2 = particleB.radius;
    var x1 = particleA.position.x;
    var y1 = particleA.position.y;
    var z1 = particleA.position.z;
    var x2 = particleB.position.x;
    var y2 = particleB.position.y;
    var z2 = particleB.position.z;     
    var vx1 = particleA.velocity.x;
    var vy1 = particleA.velocity.y;
    var vz1 = particleA.velocity.z;
    var vx2 = particleB.velocity.x;
    var vy2 = particleB.velocity.y;
    var vz2 = particleB.velocity.z;
    
    var  r12,m21,d,v,theta2,phi2,st,ct,sp,cp,vx1r,vy1r,vz1r,fvz1r,thetav,phiv,dr,alpha,beta,sbeta,cbeta,dc,sqs,t,a,dvz2,vx2r,vy2r,vz2r,x21,y21,z21,vx21,vy21,vz21,vx_cm,vy_cm,vz_cm;

    r12=r1+r2;
    m21=m2/m1;
    x21=x2-x1;
    y21=y2-y1;
    z21=z2-z1;
    vx21=vx2-vx1;
    vy21=vy2-vy1;
    vz21=vz2-vz1;
    
    vx_cm = (m1*vx1+m2*vx2)/(m1+m2) ;
    vy_cm = (m1*vy1+m2*vy2)/(m1+m2) ;
    vz_cm = (m1*vz1+m2*vz2)/(m1+m2) ;  
          //     **** calculate relative distance and relative speed ***
    d=Math.sqrt(x21*x21 +y21*y21 +z21*z21);
    v=Math.sqrt(vx21*vx21 +vy21*vy21 +vz21*vz21); 
          //     **** return if distance between balls smaller than sum of radii ****
    if (d<r12) {return ("overlap");}
                 
          //     **** return if relative speed = 0 ****
    if (v==0) {return "still objects"}
                 
          
          //     **** shift coordinate system so that ball 1 is at the origin ***
                 x2=x21;
                 y2=y21;
                 z2=z21;
                 
          //     **** boost coordinate system so that ball 2 is resting ***
                 vx1=-vx21;
                 vy1=-vy21;
                 vz1=-vz21;
          
          //     **** find the polar coordinates of the location of ball 2 ***
                 theta2=Math.acos(z2/d);
                 if (x2==0 && y2==0) {phi2=0;} else {phi2=Math.atan2(y2,x2);}
                 st=Math.sin(theta2);
                 ct=Math.cos(theta2);
                 sp=Math.sin(phi2);
                 cp=Math.cos(phi2);
          
          
          //     **** express the velocity vector of ball 1 in a rotated coordinate
          //          system where ball 2 lies on the z-axis ******
                 vx1r=ct*cp*vx1+ct*sp*vy1-st*vz1;
                 vy1r=cp*vy1-sp*vx1;
                 vz1r=st*cp*vx1+st*sp*vy1+ct*vz1;
                 fvz1r = vz1r/v ;
                 if (fvz1r>1) {fvz1r=1;}   // fix for possible rounding errors
                    else if (fvz1r<-1) {fvz1r=-1;} 
                 thetav=Math.acos(fvz1r);
                 if (vx1r==0 && vy1r==0) {phiv=0;} else {phiv=Math.atan2(vy1r,vx1r);}
          
                              
          //     **** calculate the normalized impact parameter ***
                 dr=d*Math.sin(thetav)/r12;
          
          
          //     **** return old positions and velocities if balls do not collide ***
                 if (thetav>1.5707963 || Math.abs(dr)>1) {

                    /* not needed as we haven't applied these values to the objects.
                     but leaving this here as it might come in handy in future
                     x2=x2+x1;
                     y2=y2+y1;
                     z2=z2+z1;
                     vx1=vx1+vx2;
                     vy1=vy1+vy2;
                     vz1=vz1+vz2;
                     */

                     return "no collision";
                  }



                t=(d*Math.cos(thetav) -r12*Math.sqrt(1-dr*dr))/v;
                 if(t>(1/60)){
                  return "no collision yet"

                 }
                 
          //     **** calculate impact angles if balls do collide ***
                 alpha=Math.asin(-dr);
                 beta=phiv;
                 sbeta=Math.sin(beta);
                 cbeta=Math.cos(beta);
                  
                 
          //     **** calculate time to collision ***

          
               
          //     **** update positions and reverse the coordinate shift ***
                 x2=(x2+vx2*t) +x1;
                 y2=(y2+vy2*t) +y1;
                 z2=(z2+vz2*t) +z1;
                 x1=((vx1+vx2)*t) +x1;
                 y1=((vy1+vy2)*t) +y1;
                 z1=((vz1+vz2)*t) +z1;
                  
           
                 
          //  ***  update velocities ***
          
                 a=Math.tan(thetav+alpha);
          
                 dvz2=2*(vz1r+a*(cbeta*vx1r+sbeta*vy1r))/((1+a*a)*(1+m21));
                 
                 vz2r=dvz2;
                 vx2r=a*cbeta*dvz2;
                 vy2r=a*sbeta*dvz2;
                 vz1r=vz1r-m21*vz2r;
                 vx1r=vx1r-m21*vx2r;
                 vy1r=vy1r-m21*vy2r;
          
                 
          //     **** rotate the velocity vectors back and add the initial velocity
          //           vector of ball 2 to retrieve the original coordinate system ****
                               
                 vx1=(ct*cp*vx1r-sp*vy1r+st*cp*vz1r )+vx2;
                 vy1=(ct*sp*vx1r+cp*vy1r+st*sp*vz1r )+vy2;
                 vz1=(ct*vz1r-st*vx1r               )+vz2;
                 vx2=(ct*cp*vx2r-sp*vy2r+st*cp*vz2r )+vx2;
                 vy2=(ct*sp*vx2r+cp*vy2r+st*sp*vz2r )+vy2;
                 vz2=(ct*vz2r-st*vx2r               )+vz2;
                  
          
          //     ***  velocity correction for inelastic collisions ***
          
                 vx1=(vx1-vx_cm)*this.R + vx_cm;
                 vy1=(vy1-vy_cm)*this.R + vy_cm;
                 vz1=(vz1-vz_cm)*this.R + vz_cm;
                 vx2=(vx2-vx_cm)*this.R + vx_cm;
                 vy2=(vy2-vy_cm)*this.R + vy_cm;
                 vz2=(vz2-vz_cm)*this.R + vz_cm;  

                  particleA.position.x = x1;
                  particleA.position.y = y1;
                  particleA.position.z = z1;
                  particleB.position.x = x2;
                  particleB.position.y = y2;
                  particleB.position.z = z2;     
                  particleA.velocity.x = vx1;
                  particleA.velocity.y = vy1;
                  particleA.velocity.z = vz1;
                  particleB.velocity.x = vx2;
                  particleB.velocity.y = vy2;
                  particleB.velocity.z = vz2;
          
                 return "collision";
  }

  collide(particleA, particleB){
    
    var minimumDistance = particleA.softRadius + particleB.softRadius;
        var distance = particleA.position.distanceTo(particleB.position);
        var difference = distance-minimumDistance;
        if(difference<0){

          var percentShift = difference/(minimumDistance*2);
          var shift = 0.1;
          var xDist = particleB.position.x - particleA.position.x;
          var yDist = particleB.position.y - particleA.position.y;
          var zDist = particleB.position.z - particleA.position.z;

          particleB.position.x -= (xDist*percentShift);
          particleA.position.x += (xDist*percentShift);
          particleB.position.y -= (yDist*percentShift);
          particleA.position.y += (yDist*percentShift);
          particleB.position.z -= (zDist*percentShift);
          particleA.position.z += (zDist*percentShift);

          particleB.velocity.x -= (xDist*percentShift*shift);
          particleA.velocity.x += (xDist*percentShift*shift);
          particleB.velocity.y -= (yDist*percentShift*shift);
          particleA.velocity.y += (yDist*percentShift*shift);
          particleB.velocity.z -= (zDist*percentShift*shift);
          particleA.velocity.z += (zDist*percentShift*shift);

        }
        
  }

	addMember(point){
		this.members.push(point);
	}
}

/*





                //*****************************************************************************
          //   This program is a 'remote' 3D-collision detector for two balls on linear
          //   trajectories and returns, if applicable, the location of the collision for 
          //   both balls as well as the new velocity vectors (assuming a partially elastic
          //   collision as defined by the restitution coefficient).
          //   The equations on which the code is based have been derived at
          //   http://www.plasmaphysics.org.uk/collision3d.htm
          //
          //   All variables apart from 'error' are of Double Precision Floating Point type.
          //
          //   The Parameters are:
          //
          //    R    (restitution coefficient)  between 0 and 1 (1=perfectly elastic collision)
          //    m1    (mass of ball 1)
          //    m2    (mass of ball 2)
          //    r1    (radius of ball 1)
          //    r2    (radius of ball 2)
          //  & x1    (x-coordinate of ball 1) 
          //  & y1    (y-coordinate of ball 1)          
          //  & z1    (z-coordinate of ball 1) 
          //  & x2    (x-coordinate of ball 2)              
          //  & y2    (y-coordinate of ball 2)         
          //  & z2    (z-coordinate of ball 2)         
          //  & vx1   (velocity x-component of ball 1) 
          //  & vy1   (velocity y-component of ball 1)
          //  & vz1   (velocity z-component of ball 1)          
          //  & vx2   (velocity x-component of ball 2)         
          //  & vy2   (velocity y-component of ball 2)
          //  & vz2   (velocity z-component of ball 2)
          //  & error (int)     (0: no error 
          //                     1: balls do not collide
          //                     2: initial positions impossible (balls overlap))
          //
          //   Note that the parameters with an ampersand (&) are passed by reference,
          //   i.e. the corresponding arguments in the calling program will be updated 
          //   (the positions and velocities however only if 'error'=0).
          //   All variables should have the same data types in the calling program
          //   and all should be initialized before calling the function.
          //
          //   This program is free to use for everybody. However, you use it at your own
          //   risk and I do not accept any liability resulting from incorrect behaviour.
          //   I have tested the program for numerous cases and I could not see anything 
          //   wrong with it but I can not guarantee that it is bug-free under any 
          //   circumstances.
          //
          //   I would appreciate if you could report any problems to me
          //   (for contact details see  http://www.plasmaphysics.org.uk/feedback.htm ).
          //
          //   Thomas Smid   February 2004
          //                 December 2005 (a few minor changes to improve speed)
          //                 December 2009 (generalization to partially inelastic collisions)
          //                 July     2011 (fix for possible rounding errors)
          //******************************************************************************

separate(){





  console.log(this.members[i].position, this.members[j].position);

          var percentShift = difference/(minimumDistance*2);
          console.log("min:", minimumDistance, "dist:", distance, "diff:", difference, "perc:", percentShift);

          var xDist = this.members[j].position.x - this.members[i].position.x;
          var yDist = this.members[j].position.y - this.members[i].position.y;
          var zDist = this.members[j].position.z - this.members[i].position.z;
          console.log("xd:", xDist, "yd:", yDist, "zd:", zDist);

          this.members[j].position.x -= (xDist*percentShift);
          this.members[i].position.x += (xDist*percentShift);
          this.members[j].position.y -= (yDist*percentShift);
          this.members[i].position.y += (yDist*percentShift);
          this.members[j].position.z -= (zDist*percentShift);
          this.members[i].position.z += (zDist*percentShift);
          console.log(this.members[i].position, this.members[j].position);
        }
}


checkColl(A, B) {
        var dx = controls.objects[B].position.x - controls.objects[A].position.x;
        var dy = controls.objects[B].position.y - controls.objects[A].position.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.radii[A] + this.radii[B]) {
            var angle = Math.atan2(dy, dx);
            cosa = Math.cos(angle);
            sina = Math.sin(angle);
            var vx1p = cosa * this.xv[A] + sina * this.yv[A];
            var vy1p = cosa * this.yv[A] - sina * this.xv[A];
            var vx2p = cosa * this.xv[B] + sina * this.yv[B];
            var vy2p = cosa * this.yv[B] - sina * this.xv[B];
            var P = vx1p * this.mass[A] + vx2p * this.mass[B];
            var V = vx1p - vx2p;
            vx1p = (P - this.mass[B] * V) / (this.mass[A] + this.mass[B]);
            vx2p = V + vx1p;
            this.xv[A] = cosa * vx1p - sina * vy1p;
            this.yv[A] = cosa * vy1p + sina * vx1p;
            this.xv[B] = cosa * vx2p - sina * vy2p;
            this.yv[B] = cosa * vy2p + sina * vx2p;
            var diff = ((this.radii[A] + this.radii[B]) - dist) / 2;
            var cosd = cosa * diff;
            var sind = sina * diff;
            controls.objects[A].position.x -= cosd;
            controls.objects[A].position.y -= sind;
            controls.objects[B].position.x += cosd;
            controls.objects[B].position.y += sind;
        }
    }
*/