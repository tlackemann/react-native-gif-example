//
//  RNFLAnimatedImageManager.m
//  RNGifExample
//
//  Created by Thomas Lackemann on 12/20/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>

#import "RCTUIManager.h"
#import "UIView+React.h"

#import "RNFLAnimatedImageManager.h"
#import "RNFLAnimatedImage.h"

@implementation RNFLAnimatedImageManager

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (UIView *)view
{
  RNFLAnimatedImage *animatedImage = [RNFLAnimatedImage new];
  return animatedImage;
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_VIEW_PROPERTY(src, NSString);
RCT_EXPORT_VIEW_PROPERTY(contentMode, NSNumber);
RCT_EXPORT_VIEW_PROPERTY(onFrameChange, RCTDirectEventBlock)

- (NSDictionary *) constantsToExport {
  return @{
           @"ScaleAspectFit": @(UIViewContentModeScaleAspectFit),
           @"ScaleAspectFill": @(UIViewContentModeScaleAspectFill),
           @"ScaleToFill": @(UIViewContentModeScaleToFill)
           };
}

@end
