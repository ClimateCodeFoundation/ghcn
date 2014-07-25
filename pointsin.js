// tree.north includes all points whose latitude is >= tree.latitude
// tree.east includes all points who longitude is >= tree.longitude

in_box = function(point, box) {
    if(point.longitude >= box.left && point.longitude < box.right
      && point.latitude >= box.bottom && point.latitude < box.top) {
        return true
    } else {
      return false
    }
}

// return all points in box
boxClip = function(box, tree) {
    var i
    var l
    // leaf node, test each point
    if(tree.points) {
        l = []
        for(i=0; i<tree.points.length; ++i) {
            if(in_box(tree.points[i], box)) {
                l.push(tree.points[i])
            }
        }
        return l
    }
    // either sliced by a plane of fixed latitude, or fixed longitude
    if(tree.hasOwnProperty('latitude')) {
        var latitude = tree.latitude
        if(box.bottom >= tree.latitude) {
            // box is entirely in Northern half.
            return boxClip(box, tree.north)
        }
        if(box.top < tree.latitude) {
            // box is entirely in Southern half.
            return boxClip(box, tree.south)
        }
        return boxClip(box, tree.north).concat(
          boxClip(box, tree.south))
    }
    var longitude = tree.longitude
    if(box.left >= tree.longitude) {
        // box is entirely in Eastern half.
        return boxClip(box, tree.east)
    }
    if(box.right < tree.longitude) {
        // box is entirely in Western half.
        return boxClip(box, tree.west)
    }
    return boxClip(box, tree.east).concat(
      boxClip(box, tree.west))
}

if(0) {

tree1 = {points:[{latitude:0,longitude:0}]}
box={top:1,bottom:0,left:0,right:1}

console.log(boxClip(box, tree1))
tree1a = {points:[{latitude:50,longitude:0}]}
console.log(boxClip(box, tree1a))
tree2 = {latitude:10,north:tree1a,south:tree1}
console.log(boxClip(box, tree2))

box={top:52,bottom:50,left:-2,right:1}
console.log(boxClip(box, all_tree))
}
