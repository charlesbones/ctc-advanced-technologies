import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ButtonStateDescriptionPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'buttonStateDescription',
})
export class ButtonStateDescriptionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(buttonState: number, ...args) {
    let description;

    // TODO get code from SensorTag for multiple buttons
    if (buttonState === 0) {
      description = 'Button is Released';
    } else if (buttonState) {
      description = 'Button is Pressed';
    } else {
      description = 'Button State is Unknown';
    }

    return description;
  }
}
