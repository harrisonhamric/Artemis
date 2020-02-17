import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

import { ArtemisSharedModule } from 'app/shared/shared.module';
import { MomentModule } from 'ngx-moment';
import { ExerciseScoresComponent } from './exercise-scores.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ArtemisProgrammingAssessmentModule } from 'app/programming-assessment/programming-assessment.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ArtemisDataTableModule } from 'app/components/data-table/data-table.module';
import { FeatureToggleModule } from 'app/feature-toggle/feature-toggle.module';
import { ProgrammingExerciseUtilsModule } from 'app/entities/programming-exercise/utils/programming-exercise-utils.module';
import { SortByPipe } from 'app/components/pipes/sort-by.pipe';
import { ArtemisResultModule } from 'app/entities/result/result.module';
import { SortByModule } from 'app/components/pipes/sort-by.module';
import { FormDateTimePickerModule } from 'app/shared/date-time-picker/date-time-picker.module';

const ENTITY_STATES = [
    {
        path: 'course/:courseId/exercise/:exerciseId/dashboard',
        component: ExerciseScoresComponent,
        data: {
            authorities: ['ROLE_ADMIN', 'ROLE_INSTRUCTOR', 'ROLE_TA'],
            pageTitle: 'instructorDashboard.exerciseDashboard',
        },
        canActivate: [UserRouteAccessService],
    },
];

@NgModule({
    imports: [
        ArtemisSharedModule,
        MomentModule,
        RouterModule.forChild(ENTITY_STATES),
        NgbModule,
        ArtemisResultModule,
        SortByModule,
        FormDateTimePickerModule,
        NgxDatatableModule,
        ArtemisDataTableModule,
        ArtemisProgrammingAssessmentModule,
        FeatureToggleModule,
        ProgrammingExerciseUtilsModule,
    ],
    declarations: [ExerciseScoresComponent],
    entryComponents: [ExerciseScoresComponent],
    providers: [SortByPipe],
})
export class ArtemisExerciseScoresModule {}
