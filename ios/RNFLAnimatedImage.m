//
//  RNFLAnimatedImage.m
//  RNGifExample
//
//  Created by Thomas Lackemann on 12/20/16.
//  Copyright © 2016 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <ImageIO/ImageIO.h>
#import "FLAnimatedImage/FLAnimatedImage.h"

#import "UIView+React.h"
#import "RCTLog.h"

#import "RNFLAnimatedImage.h"

@implementation RNFLAnimatedImage {
  
  FLAnimatedImage *_image;
  FLAnimatedImageView *_imageView;
  
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if ((self = [super initWithFrame:frame])) {
    _imageView = [[FLAnimatedImageView alloc] init];
    
    [_imageView addObserver:self forKeyPath:@"currentFrameIndex" options:0 context:nil];
  }
  return self;
}

RCT_NOT_IMPLEMENTED(- (instancetype)initWithCoder:(NSCoder *)aDecoder)

- (void)removeFromSuperview
{
  
  [_imageView removeObserver:self forKeyPath:@"currentFrameIndex"];
  [super removeFromSuperview];
}

- (void)layoutSubviews
{
  _imageView.frame = self.bounds;
  [self addSubview:_imageView];
}

- (void)setSrc:(NSString *)src
{
  if (![src isEqual:_src]) {
    _src = [src copy];
    [self reloadImage];
  }
}

- (void)setContentMode:(NSNumber *)contentMode
{
  if(![contentMode isEqual:_contentMode]) {
    _contentMode = contentMode;
    [self reloadImage];
  }
}

-(void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary<NSString *,id> *)change context:(void *)context {
  if (object == _imageView) {
    if ([keyPath isEqualToString:@"currentFrameIndex"]) {
      if(_onFrameChange){
        _onFrameChange(@{
                         @"currentFrameIndex":[NSNumber numberWithUnsignedInteger:[object currentFrameIndex]],
                         @"frameCount": [NSNumber numberWithUnsignedInteger:[_image frameCount]],
                         });
      }
    }
  }
}

-(void)reloadImage {
  _image = [FLAnimatedImage animatedImageWithGIFData:[NSData dataWithContentsOfURL:[NSURL URLWithString:_src]]];
  _imageView.contentMode = [_contentMode integerValue];
  _imageView.animatedImage = _image;
  
}
@end
