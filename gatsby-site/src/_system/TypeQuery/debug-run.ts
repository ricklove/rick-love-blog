import { watchFilesToGenerateTypeQuery } from './generate-type-query';
import { resolvePath } from '../utils';

watchFilesToGenerateTypeQuery(resolvePath(`../../`));
