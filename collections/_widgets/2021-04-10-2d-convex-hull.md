---
layout: widget-base2
---

<button onclick="genRandom()">Reset</button>
Mouse Mode:
<select onchange="mouseOption(event)">
  <option value="drag">Drag</option>
  <option value="create">Create</option>
  <option value="erase">Erase</option>
</select>
Movement Type:
<select onchange="moveOption(event)">
  <option value="frozen">Frozen</option>
  <option value="slow">Slow</option>
  <option value="free">Free</option>
  <option value="elastic">Elastic</option>
</select>
<button onclick="genHull(true)">Regenerate Hull</button>

<canvas id="canvas"></canvas>

Given some set of points, a convex hull is the smallest convex polygon that contains all the points. In 2d, it is also known as the Gift wrapping/minimum enclosing fence problem. This program demonstrates an algorithm that finds the convex hull for n points in O(n log n) time. Click `regenerate hull` while in frozen mode to see it in action.

You can also add, remove, or drag points, and give then a random velocity. In Elastic mode, the hull tries to contract, applying a force like a real rubber band. This makes for some fun physics simulations involving pressure and temperature.


<script>
		var canvas=document.getElementById("canvas"),canv=canvas.getContext("2d"),W=window.innerWidth*0.7,H=window.innerHeight*0.6;
		var n=0,p=[],h=0,hull=[],inHull=[],curDrag=null,drawNum=0,mouseType="drag",moveType="frozen";
		canvas.width=W
		canvas.height=H;
		canvas.onmousedown=beginDrag;
		canvas.onmouseup=endDrag;
		setInterval(move,10);
		while(n<5){
			genRandom();
		}
		function sleep(ms) {
		  return new Promise(resolve => setTimeout(resolve, ms));
		}
		function drawCircle(p){
			canv.beginPath();
			canv.arc(p[0],p[1],n>25? 5:10,0,2*Math.PI);
			canv.fill();
			canv.stroke();
		}
		function drawLine(p1,p2){
			canv.beginPath();
			canv.moveTo(p1[0],p1[1]);
			canv.lineTo(p2[0],p2[1]);
			canv.stroke();
		}
		function cross(p0,p1,p2){
			return (p1[0]-p0[0])*(p2[1]-p0[1])-(p1[1]-p0[1])*(p2[0]-p0[0]);
		}
		function add(p1,p2){
			return [p1[0]+p2[0],p1[1]+p2[1]];
		}
		function mul(p,x){
			return [p[0]*x,p[1]*x];
		}
		function sub(p1,p2){
			return add(p1,mul(p2,-1));
		}
		function length(p){
			return Math.sqrt(p[0]*p[0]+p[1]*p[1]);
		}
		function norm(p){
			return mul(p,1/length(p));
		}
		function drawHull(){
			canv.clearRect(0,0,W,H);
			h=hull.length;
			canv.lineWidth=(n>25? 1:5);
			canv.strokeStyle="black";
			canv.fillStyle="black";
			for(let i=0;i<p.length;i++)
				drawCircle(p[i]);
			canv.strokeStyle="red";
			for(let i=0;i<h;i++) drawLine(hull[i],hull[(i+1)%h]);
			canv.strokeStyle="black";
			canv.fillStyle="yellow";
			for(let i=0;i<h;i++)
				drawCircle(hull[i]);
			canv.fillStyle="black";
			canv.fillText("Count: "+n,5,10);
		}
		async function genHull(slow){
			if(n===0){
				canv.clearRect(0,0,W,H);
				return;
			}
			var dragP=null,curNum=++drawNum;
			hull=[]
			if(curDrag!=null) dragP=p[curDrag];
			for(let i=0;i<n-1;i++) 
				if(p[i][0]<p[n-1][0]||p[i][0]===p[n-1][0]&&p[i][1]<p[n-1][1])
					[p[i],p[n-1]]=[p[n-1],p[i]];
			hull[0]=p.pop(); inHull=[n-1];
			p.sort(function(a,b){
				return -cross(hull[0],a,b);
			});
			p.push(hull[0]);
			for(let i=0;i<n-1;i++){
				while(hull.length>1&&cross(hull[hull.length-1],p[i],hull[hull.length-2])<0||p[i][0]===hull[hull.length-1][0]&&p[i][1]===hull[hull.length-1][1]){
					if(curNum!==drawNum) return;
					if(slow){
						drawHull();
						drawLine(p[i],hull[hull.length-1]);
						await sleep(n>25? 400:700);
					}
					hull.pop(); inHull.pop();
				}
				if(curNum!==drawNum) return;
				hull.push(p[i]); inHull.push(i);
				if(slow){
					drawHull();
					await sleep(n>25? 400:700);
				}
			}
			if(dragP!=null) 
				for(let i=0;i<n;i++) if(p[i][0]===dragP[0]&&p[i][1]===dragP[1]&&p[i][2]===dragP[2]&&p[i][3]===dragP[3]) curDrag=i;
			drawHull();
		}
		function genRandom(){
			n=Math.random()*10,p=[]; n=Math.floor(n*n)+3;
			for(let i=0;i<n;i++)
				p.push([Math.floor(Math.random()*W),Math.floor(Math.random()*H),Math.random()*W/50-W/100,Math.random()*H/50-H/100]);
			genHull();
		}
		function beginDrag(e){
			canvas.onmousemove=dragDot;
      var rect = canvas.getBoundingClientRect();
			var x=e.x-rect.left,y=e.y-rect.top,dist=200;
			for(let i=0;i<n;i++)
				if((x-p[i][0])*(x-p[i][0])+(y-p[i][1])*(y-p[i][1])<dist){
					dist=(x-p[i][0])*(x-p[i][0])+(y-p[i][1])*(y-p[i][1]);
					curDrag=i;
				}
		}
		function endDrag(e){
			curDrag=null;
			canvas.onmousemove=null;
		}
		function dragDot(e){
			if(curDrag===null) return;
      var rect = canvas.getBoundingClientRect();
			var x=e.x-rect.left,y=e.y-rect.top;
			p[curDrag]=[x,y,0,0];
			genHull();
		}
		function createDot(e){
      var rect = canvas.getBoundingClientRect();
			var x=e.x-rect.left,y=e.y-rect.top;
			p.push([x,y,Math.random()*W/50-W/100,Math.random()*H/50-H/100]); n++;
			genHull();
		}
		function eraseDot(e){
      var rect = canvas.getBoundingClientRect();
			var x=e.x-rect.left,y=e.y-rect.top;
			var dist=200,toDelete=null;
			for(let i=0;i<n;i++)
				if((x-p[i][0])*(x-p[i][0])+(y-p[i][1])*(y-p[i][1])<dist){
					dist=(x-p[i][0])*(x-p[i][0])+(y-p[i][1])*(y-p[i][1]);
					toDelete=i;
				}
			if(toDelete!==null) p.splice(toDelete,1);
			n=p.length;
			genHull();
		}
		function mouseOption(e){
			mouseType=e.target.value;
			if(mouseType==="drag"){
				canvas.onmousedown=beginDrag;
				canvas.onmouseup=endDrag;
			}
			else if(mouseType==="create"){
				canvas.onmousedown=createDot;
				canvas.onmouseup=null;
			}
			else if(mouseType==="erase"){
				canvas.onmousedown=eraseDot;
				canvas.onmouseup=null;
			}
		}
		function move(){
			if(moveType==="frozen") return;
			for(let i=0;i<n;i++){
				if(p[i][0]<0&&p[i][2]<0) p[i][2]*=-1;
				else if(p[i][0]>W&&p[i][2]>0) p[i][2]*=-1;
				if(p[i][1]<0&&p[i][3]<0) p[i][3]*=-1;
				else if(p[i][1]>H&&p[i][3]>0) p[i][3]*=-1;
				if(moveType==="free"){
					p[i][0]+=p[i][2];
					p[i][1]+=p[i][3];
				}
				else{
					p[i][0]+=p[i][2]/5;
					p[i][1]+=p[i][3]/5;
				}
			}
			if(moveType==="elastic"){
				h=hull.length,len=0;
				for(let i=0;i<h;i++) len+=length(sub(hull[i],hull[(i+1)%h]));
				for(let i=0;i<h;i++){
					if(p[inHull[i]][0]<0||p[inHull[i]][1]<0||p[inHull[i]][0]>W||p[inHull[i]][1]>H) continue;
					f=add(norm(sub(hull[(i+1)%h],hull[i])),norm(sub(hull[(i-1+h)%h],hull[i])));
					p[inHull[i]][2]+=f[0]*len/2000; p[inHull[i]][3]+=f[1]*len/2000;
				}
			}
      let e=p.reduce((e,a)=>e+a[2]*a[2]+a[3]*a[3],0);
      console.log(e+len*len/401.2543897375425);
			genHull();
		}
		function moveOption(e){
			moveType=e.target.value;
		}
</script>