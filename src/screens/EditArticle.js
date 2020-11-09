/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Content, Text, Item, Input, Button } from 'native-base';
import { StyleSheet } from 'react-native';

export default function EditArticle() {
  return (
    <Container>
      <Content style={styles.padding}>
        <Text style={[styles.bold, styles.header]}>
          Edit your article here.
        </Text>
        <Text style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
          Title
        </Text>
        <Item regular style={styles.marginBottom}>
          <Input
            multiline={true}
            numberOfLines={3}
            style={styles.fontSize_14}
            value="Liga Inggris: James Rodriguez Buka-bukaan Alasan Pernah Tolak Gabung Manchester United"
          />
        </Item>
        <Text style={[styles.bold, styles.fontSize_14, styles.marginBottom]}>
          Content/Description
        </Text>
        <Item regular style={styles.marginBottom}>
          <Input
            multiline={true}
            numberOfLines={9}
            style={styles.fontSize_14}
            value='Bola.com, Liverpool - Striker Everton, James Rodriguez, mengungkap fakta menarik menjelang duel melawan Manchester United di Liga Inggris, Sabtu (7/11/2020) malam. Ternyata, ia pernah melewatkan kans pindah ke klub raksasa Inggris tersebut. \n\nManchester United pernah mendekati James Rodriguez delapan tahun lalu, tepatnya pada era Sir Alex Ferguson. Saat itu, ia masih merumput di Porto.\n\nAlih-alih hijrah ke Inggris, James Rodriguez memilih bertahan di Porto, kemudian setahun berselang pindah ke Ligue 1, untuk menerima tawaran Monaco. \n\nPada 2014, ia menjelma menjadi superstar global di Piala Dunia bersama Timnas Kolombia. Setelah itu ia pindah ke Real Madrid pada tahun yang sama. Sayangnya, kariernya bersama El Real tak terlalu moncer. \n\nPemain berusia 29 tahun itu kini bereuni dengan Carlo Ancelotti di Everton dan kembali menemukan performa apiknya. Rodriguez juga dinyatakan fit dan bisa bermain melawan United, setelah absen pada laga sebelumnya kontra Newcastle United. \n\nMenjelang laga itu, Rodriguez mengenang momen saat Manchester United berusaha merekrutnya pada 2012. \n\n\"Peristiwanya sudah lama sekali, saya yakin pada 2012. Klub telah menawari saya sesuatu, tetapi pada akhirnya tidak terjadi karena suatu alasan yang saya tidak tahu,\" ujar James Rodriguez, seperti dilansir Daily Star.\n\nMeskipun melewatkan peluang gabung Manchester United, James Rodriguez tidak menyesal. Ia merasa memang ditakdirkan untuk klub lain. \n\n\"Jika itu tidak terjadi, maka pasti ada beberapa alasan. Mungkin saya tidak siap (bermain untuk MU), atau mungkin saya memang tercipta untuk bermain dengan tim hebat lainnya,\" ujar Rodriguez. \n\n\"Pada akhirnya saya punya peluang pindah ke Prancis dan itu jalan yang saya tempuh.\" \n\nKetika ditanya apakah pernah bertanya-tanya tentang apa yang bisa terjadi jika bergabung dengan United bertahun-tahun yang lalu, Rodriguez menjawab singkat \"Tidak, tidak juga,\" ujar Rodriguez. \n\n\"Ketika pindah ke Prancis, saya fokus tampil bagus pada tahun itu,\" imbuhnya. \n\nSumber: Daily Star'
          />
        </Item>
        <Button rounded block style={styles.btn}>
          <Text style={styles.white}>Save Article</Text>
        </Button>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  padding: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  fontSize_14: {
    fontSize: 14,
  },
  bold: {
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#2395FF',
    marginTop: 32,
    marginBottom: 20,
  },
  white: {
    color: 'white',
  },
  marginBottom: {
    marginBottom: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    marginTop: 16,
  },
});
