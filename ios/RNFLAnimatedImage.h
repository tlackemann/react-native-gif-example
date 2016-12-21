//
//  RNFLAnimatedImage.h
//  RNGif
//
//  Created by Thomas Lackemann on 12/20/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import "RCTView.h"
#import "FLAnimatedImage/FLAnimatedImage.h"

@class RNFLAnimatedImage;

@interface RNFLAnimatedImage : UIView

@property (nonatomic, copy) NSString *src;
@property (nonatomic, assign) NSNumber *contentMode;
@property (nonatomic, copy) RCTDirectEventBlock onFrameChange;

@end
