import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RegionInfo } from '../models/region-info';

@Injectable()
export class RegionService {

    private readonly ukrainianRegions: RegionInfo[];

    constructor() {
        this.ukrainianRegions = environment.Regions.UkrainianRegions;
    }

    getUkrainianRegions(): RegionInfo[] {
        return this.ukrainianRegions;
    }
}
