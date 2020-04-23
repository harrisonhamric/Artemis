/* tslint:disable max-line-length */
import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { map, take } from 'rxjs/operators';
import { AnswerOptionService } from 'app/entities/answer-option/answer-option.service';
import { AnswerOption, IAnswerOption } from 'app/shared/model/answer-option.model';

describe('Service Tests', () => {
    describe('AnswerOption Service', () => {
        let injector: TestBed;
        let service: AnswerOptionService;
        let httpMock: HttpTestingController;
        let elemDefault: IAnswerOption;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule],
            });
            injector = getTestBed();
            service = injector.get(AnswerOptionService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new AnswerOption(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', false, false);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a AnswerOption', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                    },
                    elemDefault,
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new AnswerOption(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a AnswerOption', async () => {
                const returnedFromService = Object.assign(
                    {
                        text: 'BBBBBB',
                        hint: 'BBBBBB',
                        explanation: 'BBBBBB',
                        isCorrect: true,
                        invalid: true,
                    },
                    elemDefault,
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of AnswerOption', async () => {
                const returnedFromService = Object.assign(
                    {
                        text: 'BBBBBB',
                        hint: 'BBBBBB',
                        explanation: 'BBBBBB',
                        isCorrect: true,
                        invalid: true,
                    },
                    elemDefault,
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body),
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a AnswerOption', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});