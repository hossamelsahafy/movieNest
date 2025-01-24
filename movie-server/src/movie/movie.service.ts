import { Injectable, HttpService, NotFoundException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  private readonly apiKey = process.env.APIKEY;
  private readonly baseUrl = 'http://www.omdbapi.com/';

  constructor(private readonly httpService: HttpService) {}

  async searchMovies(query: string): Promise<any> {
    if (!query) {
      throw new NotFoundException('Search query is required');
    }

    const url = `${this.baseUrl}?apikey=${this.apiKey}&s=${query}`;
    const response = await lastValueFrom(this.httpService.get(url));

    if (response.data.Response === 'False') {
      throw new NotFoundException(response.data.Error || 'No movies found');
    }

    return response.data.Search.map((movie) => ({
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster !== 'N/A' ? movie.Poster : null,
    }));
  }
}
