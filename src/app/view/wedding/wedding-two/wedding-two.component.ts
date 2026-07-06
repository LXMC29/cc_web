import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

interface StoryItem {
  title: string;
  text: string;
  image: string;
  wide?: boolean;
}

interface Wish {
  name: string;
  message: string;
}

@Component({
  selector: 'app-wedding-two',
  imports: [CommonModule, FormsModule],
  templateUrl: './wedding-two.component.html',
  styleUrl: './wedding-two.component.scss',
})
export class WeddingTwoComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('reveal') revealBlocks!: QueryList<ElementRef<HTMLElement>>;

  private observer?: IntersectionObserver;
  private countdownTimer?: ReturnType<typeof setInterval>;
  private revealChanges?: Subscription;
  private routeChanges?: Subscription;
  private readonly weddingDate = new Date(2026, 6, 19, 10, 30, 0);
  private readonly wishesStorageKey = 'wedding-two-wishes';
  private readonly musicEmbed =
    'https://www.youtube.com/embed/LG5hQJsO8k0?si=LwqmN0Ylnt9YrMSG&autoplay=1&playsinline=1';
  private readonly guestSheetUrl =
    'https://docs.google.com/spreadsheets/d/e/2PACX-1vQehivFrQTpVbBBSflmnuk0W-uTfokNEhVn9tNJadn5XbHYH9XZYzAuEnVHwYx3e_rQbKiZLoJ8TvX3/pub?output=csv';

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly route: ActivatedRoute,
  ) {
    this.musicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.musicEmbed,
    );
  }

  readonly driveImageIds = [
    '1Ivyx186Z4cwFLcIwPOfQKSneEw2o8BrT',
    '1E8Ml2vUjdpiMMwCo8Xvqy7LxPSd2O-qc',
    '1J0ykBaC2sXdnT1DjCikhJ_jlwzB1aCxF',
    '1SYbKxhMWqYGL5pz4_PzZRmcnYma-0dKR',
    '1VuGuXRkyicF5EegIE3mA21OgDsf6taik',
    '10G0Hb7iMcm2uTRVGwLTHc8rJHE7wDbFl',
    '1PLszCaugfjlLbaPpOx7_ZAcipxm3Gucb',
    '1A_CbDC3fDL_dSlJuYp5x9FH7UL8Oh8ru',
    '1cVKZg4JQjHd7y3mYAwm289xanlHcp6AS',
    '1AoLcl_s-YeJVQyqAavUTluPIgVVOWjOw',
    '1iEOlcK4DJpZpteceSUw76vc8MdwpcDzd',
    '1KYxOKxLt_TTt7saM-jGJZKAPbV2vUMLI',
    '1jAS5Kuz4JH3i7mmN0UxiSUUMJh-w5-8n',
    '161RHllILcli9a-Kg4FvXeH39S9sB77Fz',
    '1oEh2d61cHy-2fZPHyuTzM6LArQMmsZVH',
    '1gKTjsIjqnw9dL85XhYuKG5japVKh05KM',
    '11kHPZ49nVVlxyw3s2k0yUUdPmmvnM3la',
    '1B22sPsmkAQfZ2JpyxwXiQTkc8DDHQfFL',
    '1tkYgVlosGeDZq26zPpL5naM9ClyAXpOz',
    '1wOErvSc20ZQwRiNrdL8Kf3-fiLwP6O65',
    '1nX_fMejhMQvuGEhFxc3bN02BnbEF_by-',
    '1wvGruYM6Hmgno1A3873xcfetwfGdyiAX',
    '1axnM_EZBL0bRaShfriATR-IxN7W6x6y3',
    '1o34-CvjOm8WJnw4fUQlG_AnBFkdde7p_',
    '15C028ZnhI68oEtBnjxqs1Rehib3eisUf',
    '126IeGYpZNN4zrP-D4Wxs8AOyzQ1DwoRu',
    '177VUvQ71JCG7wlQ7HfaV6nlGNsK8_vjb',
    '164q4WgMlg5d5TQEBhyjeffkkhNSj-4FZ',
    '1kMQW5skdHm0pOAPNtXaHF1OL1dY96N8q', //28
  ];

  readonly driveImageAbIds = [
    '126IeGYpZNN4zrP-D4Wxs8AOyzQ1DwoRu',
    '1nX_fMejhMQvuGEhFxc3bN02BnbEF_by-',
    '1wvGruYM6Hmgno1A3873xcfetwfGdyiAX',
    '1axnM_EZBL0bRaShfriATR-IxN7W6x6y3',
    '1o34-CvjOm8WJnw4fUQlG_AnBFkdde7p_',
    '15C028ZnhI68oEtBnjxqs1Rehib3eisUf',
    '177VUvQ71JCG7wlQ7HfaV6nlGNsK8_vjb',
    '164q4WgMlg5d5TQEBhyjeffkkhNSj-4FZ',
    '1kMQW5skdHm0pOAPNtXaHF1OL1dY96N8q',
    '1AoLcl_s-YeJVQyqAavUTluPIgVVOWjOw',
    '1iEOlcK4DJpZpteceSUw76vc8MdwpcDzd',
    '1KYxOKxLt_TTt7saM-jGJZKAPbV2vUMLI',
    '1jAS5Kuz4JH3i7mmN0UxiSUUMJh-w5-8n',
    '161RHllILcli9a-Kg4FvXeH39S9sB77Fz',
    '1oEh2d61cHy-2fZPHyuTzM6LArQMmsZVH',
    '1gKTjsIjqnw9dL85XhYuKG5japVKh05KM',
    '11kHPZ49nVVlxyw3s2k0yUUdPmmvnM3la',
    '1B22sPsmkAQfZ2JpyxwXiQTkc8DDHQfFL',
    '1tkYgVlosGeDZq26zPpL5naM9ClyAXpOz',
    '1wOErvSc20ZQwRiNrdL8Kf3-fiLwP6O65',
    '1Ivyx186Z4cwFLcIwPOfQKSneEw2o8BrT',
    '1E8Ml2vUjdpiMMwCo8Xvqy7LxPSd2O-qc',
    '1J0ykBaC2sXdnT1DjCikhJ_jlwzB1aCxF',
    '1SYbKxhMWqYGL5pz4_PzZRmcnYma-0dKR',
    '1VuGuXRkyicF5EegIE3mA21OgDsf6taik',
    '10G0Hb7iMcm2uTRVGwLTHc8rJHE7wDbFl',
    '1PLszCaugfjlLbaPpOx7_ZAcipxm3Gucb',
    '1A_CbDC3fDL_dSlJuYp5x9FH7UL8Oh8ru',
    '1cVKZg4JQjHd7y3mYAwm289xanlHcp6AS',
  ];
  readonly driveImageAbs = this.driveImageAbIds.map((id) =>
    this.driveImage(id, 1800),
  );
  readonly driveImageNewIds = [
    '1N6TSKLcXVCEnEInA2tsAct21ho7qEsrS', // cô dâu
    '1O18KqTxXjT00ljl_J-wC8ZTJMP6hIyI4', // địa chỉ cô dâu
    '19vRtagNUkT9K6CiEtFCeKJA3n-hTNCm7', // chú rể
    '1ZaaJ5tUuyMCwuYe_QBpftSaCIFMyWQEj', // địa chỉ chú rể
    '1zrxeq7YD0SXSYjAiK32m8YWR_FJsJZ_8', // qr chú rể
    '1ayMtCJV7BSKisC90QMFA8dE2Y0QJLB6F', // qr cô dâu
  ];
  readonly driveImages = this.driveImageIds.map((id) =>
    this.driveImage(id, 1800),
  );
  readonly driveNewImages = this.driveImageNewIds.map((id) =>
    this.driveImage(id, 1800),
  );
  readonly heroImage = this.driveImage(
    '1oEh2d61cHy-2fZPHyuTzM6LArQMmsZVH',
    2200,
  );
  readonly portraitImage = this.driveImages[15];
  readonly redImage = this.driveImages[24];
  readonly mainImage = this.driveImages[19];
  readonly softStudio = this.driveImages[6];
  readonly storie1 = this.driveImages[27];
  readonly storie2 = this.driveImages[8];
  readonly storie3 = this.driveImages[28];
  readonly storie4 = this.driveImages[6];
  readonly schoolLove = this.driveImages[27];
  readonly codauImage = this.driveNewImages[0];
  readonly diachicodauImage = this.driveNewImages[1];
  readonly chureImage = this.driveNewImages[2];
  readonly diachichureImage = this.driveNewImages[3];
  readonly qrcrImage = this.driveNewImages[4];
  readonly qrcdImage = this.driveNewImages[5];
  readonly qrbg = this.driveImages[19];
  readonly countdownImage = this.driveImage(
    '10G0Hb7iMcm2uTRVGwLTHc8rJHE7wDbFl',
    1800,
  );

  readonly calendarDays = Array.from({ length: 31 }, (_, index) => index + 1);

  readonly timeline = [
    { time: '10:30', title: 'Đón khách' },
    { time: '11:00', title: 'Lễ thành hôn' },
    { time: '11:30', title: 'Khai tiệc' },
  ];

  readonly stories: StoryItem[] = [
    {
      title: 'Lần đầu gặp gỡ',
      text: 'Chúng tôi quen nhau khi cả hai vừa bước vào thị trường lao động đầy áp lực. Chúng tôi cùng nhau sẻ chia và động viên những áp lực công việc của đối phương, ngày tháng vui vẻ đã bắt đầu một hành trình yêu thương giản dị mà bền bỉ.',
      image: this.storie1,
      wide: true,
    },
    {
      title: 'Hành trình tình yêu',
      text: 'Những năm tháng sau đó, tình yêu ấy phải đi qua nhiều thử thách. Nhưng sau tất cả, chúng tôi vẫn chọn nhau, cùng lớn lên và cùng vun đắp.',
      image: this.storie2,
      wide: true,
    },
    {
      title: 'Tình yêu lớn dần',
      text: 'Trải qua biết bao nhiêu niềm vui nỗi buồn, lúc hạnh phúc, có lúc giận hờn, cũng có những lúc có ý định buông tay. Nhưng chúng tôi vẫn ở đây bên nhau, yêu thương và thấu hiểu cho nhau. Vừa là người yêu, vừa là bạn người đồng hành, và từ nay về sau chúng tôi là vợ chồng, là gia đình.',
      image: this.storie3,
      wide: true,
    },
    {
      title: 'Mãi bên nhau nhé',
      text: 'Và hôm nay, sau trọn những năm bên nhau, chúng tôi nắm tay nhau bước vào lễ cưới. Chúng tôi nguyện mãi mãi bên nhau, cùng nhau mở ra một chương mới mang tên hạnh phúc.',
      image: this.storie4,
      wide: true,
    },
  ];

  readonly gallery = [...this.driveImageAbs];

  readonly defaultWishes: Wish[] = [
    {
      name: 'Em Chiến siêu đẹp trai',
      message: 'Chúc anh chị trăm năm hạnh phúc, sớm có cháu để em bồng.',
    },
  ];
  wishes: Wish[] = [...this.defaultWishes];

  guestName = 'Ông bà, cô dì, chú bác, bạn bè';
  attendance = 'Xác nhận tham dự';
  side = 'Nhà Trai';
  guestCount = 1;
  note = '';
  wishName = 'Ông bà, cô dì, chú bác, bạn bè';
  wishText = '';
  previewSignature = false;
  selectedGalleryImage?: string;
  isQuickActionsOpen = true;
  isMusicPlaying = true;
  musicUrl?: SafeResourceUrl;
  countdown = {
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  ngOnInit(): void {
    this.loadStoredWishes();
    this.routeChanges = this.route.queryParamMap.subscribe(() => {
      void this.loadGuestFromSheet();
    });
  }

  ngAfterViewInit(): void {
    this.updateCountdown();
    this.countdownTimer = setInterval(() => this.updateCountdown(), 1000);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
    );

    this.observeRevealBlocks();
    this.revealChanges = this.revealBlocks.changes.subscribe(() =>
      this.observeRevealBlocks(),
    );
  }

  ngOnDestroy(): void {
    this.routeChanges?.unsubscribe();
    this.revealChanges?.unsubscribe();
    this.observer?.disconnect();
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
    }
  }

  private driveImage(id: string, size: number): string {
    return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`;
  }

  private observeRevealBlocks(): void {
    this.revealBlocks?.forEach((block) => {
      const element = block.nativeElement;

      if (element.classList.contains('is-visible')) {
        return;
      }

      this.observer?.observe(element);
    });
  }

  private async loadGuestFromSheet(): Promise<void> {
    this.guestName = 'Ông bà, cô dì, chú bác, bạn bè';
    this.wishName = 'Ông bà, cô dì, chú bác, bạn bè';

    const guestSlug = this.route.snapshot.queryParamMap.get('guest') ?? '';
    const normalizedGuestSlug = this.slugifyGuest(guestSlug);

    if (!normalizedGuestSlug) {
      return;
    }

    try {
      const response = await fetch(this.guestSheetUrl, { cache: 'no-store' });

      if (!response.ok) {
        throw new Error(`Guest sheet request failed: ${response.status}`);
      }

      const csv = await response.text();
      const guestNames = this.parseCsv(csv)
        .map((row) => row[0]?.trim() ?? '')
        .filter(Boolean);
      const matchedGuest = guestNames.find(
        (name) => this.slugifyGuest(name) === normalizedGuestSlug,
      );

      if (!matchedGuest) {
        return;
      }

      this.guestName = matchedGuest;
      this.wishName = matchedGuest;
    } catch {
      return;
    }
  }

  private parseCsv(csv: string): string[][] {
    const rows: string[][] = [];
    let field = '';
    let row: string[] = [];
    let inQuotes = false;

    for (let index = 0; index < csv.length; index += 1) {
      const char = csv[index];
      const nextChar = csv[index + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        field += '"';
        index += 1;
        continue;
      }

      if (char === '"') {
        inQuotes = !inQuotes;
        continue;
      }

      if (char === ',' && !inQuotes) {
        row.push(field);
        field = '';
        continue;
      }

      if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          index += 1;
        }

        row.push(field);
        rows.push(row);
        field = '';
        row = [];
        continue;
      }

      field += char;
    }

    if (field || row.length) {
      row.push(field);
      rows.push(row);
    }

    return rows;
  }

  private slugifyGuest(value: string): string {
    let decodedValue = value;

    try {
      decodedValue = decodeURIComponent(value);
    } catch {
      decodedValue = value;
    }

    return decodedValue
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLowerCase();
  }

  private updateCountdown(): void {
    const remaining = Math.max(
      this.weddingDate.getTime() - new Date().getTime(),
      0,
    );
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    this.countdown = {
      days: this.formatCountdown(days),
      hours: this.formatCountdown(hours),
      minutes: this.formatCountdown(minutes),
      seconds: this.formatCountdown(seconds),
    };
  }

  private formatCountdown(value: number): string {
    return value.toString().padStart(2, '0');
  }

  showSignature(): void {
    this.previewSignature = true;
  }

  clearSignature(): void {
    this.previewSignature = false;
  }

  openGalleryImage(image: string): void {
    this.selectedGalleryImage = image;
  }

  closeGalleryImage(): void {
    this.selectedGalleryImage = undefined;
  }

  toggleQuickActions(): void {
    this.isQuickActionsOpen = !this.isQuickActionsOpen;
  }

  toggleMusic(): void {
    this.isMusicPlaying = !this.isMusicPlaying;
    this.musicUrl = this.isMusicPlaying
      ? this.sanitizer.bypassSecurityTrustResourceUrl(this.musicEmbed)
      : undefined;
  }

  private loadStoredWishes(): void {
    try {
      const storedValue = localStorage.getItem(this.wishesStorageKey);
      const storedWishes = storedValue
        ? (JSON.parse(storedValue) as Wish[])
        : [];
      const validStoredWishes = Array.isArray(storedWishes)
        ? storedWishes.filter(
            (wish) =>
              typeof wish?.name === 'string' &&
              typeof wish?.message === 'string' &&
              wish.message.trim(),
          )
        : [];

      this.wishes = [...validStoredWishes, ...this.defaultWishes];
    } catch {
      this.wishes = [...this.defaultWishes];
    }
  }

  private saveStoredWishes(wishes: Wish[]): void {
    localStorage.setItem(this.wishesStorageKey, JSON.stringify(wishes));
  }

  saveWish(): void {
    const name = this.wishName.trim() || 'Khách mời';
    const message = this.wishText.trim();

    if (!message) {
      return;
    }

    const newWish = { name, message };
    const storedWishes = this.wishes.filter(
      (wish) =>
        !this.defaultWishes.some(
          (defaultWish) =>
            defaultWish.name === wish.name &&
            defaultWish.message === wish.message,
        ),
    );
    const nextStoredWishes = [newWish, ...storedWishes];

    this.saveStoredWishes(nextStoredWishes);
    this.wishes = [...nextStoredWishes, ...this.defaultWishes];
    this.wishText = '';
  }
}
