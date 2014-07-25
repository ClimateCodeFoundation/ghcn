#!/usr/bin/env python3
import json
import sys

def convert_feature_to_point(f):
    coords = f['geometry']['coordinates']
    return {
      "longitude": coords[0],
      "latitude": coords[1],
      "feature":f
    }

def split_tree(features, index):
    """
    split features and make a tree. if index is 0, a longitude
    is calculated, if index is 1 a latitude is calculated.
    """

    assert index in (0, 1)

    if len(features) < 3:
        tree = {
            "points": [convert_feature_to_point(f) for f in features]
        }
        return tree
    # sort by either lat or long
    features = sorted(features, key=lambda f:f['geometry']['coordinates'][index])
    # halfway
    H = len(features) // 2
    split_at = features[H]['geometry']['coordinates'][index]
    tree = dict()
    if index:
        tree['south'] = split_tree(features[:H], 0)
        tree['north'] = split_tree(features[H:], 0)
        tree['latitude'] = split_at
    else:
        tree['west'] = split_tree(features[:H], 1)
        tree['east'] = split_tree(features[H:], 1)
        tree['longitude'] = split_at
    return tree
        
def split_root(features):
    """Split features and make a rooted tree."""
    return split_tree(features, 0)

def split_features(geo):
    assert geo['type'] == "FeatureCollection"
    return split_root(geo['features'])

def main(argv=None):
    if argv is None:
        argv = sys.argv
    tree = split_features(json.load(open("all.geojson")))
    json.dump(tree, sys.stdout, indent=2)

if __name__ == '__main__':
    main()
