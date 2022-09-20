import { Pipe, PipeTransform } from '@angular/core';

interface Step {
    [k:string]: number;
  }

@Pipe({
    name:'reverse',
    pure: false
})
export class ReversePipe implements PipeTransform {
    transform(step: Step[]): Step[] {     
        if (!step) {
            return [];
        }

        let cloneStep: Step[] = step.slice();
        return cloneStep.reverse();
    } 
}