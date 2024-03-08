package com.example.kvizznanja;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

public class CustomAdapter3 extends RecyclerView.Adapter<CustomAdapter3.CustomViewHolder> {

    private List<Result> dataList;
    private Context context;
    public CustomAdapter3(Context context, List<Result> dataList ){
        this.context = context;
        this.dataList = dataList;
    }

    class CustomViewHolder extends RecyclerView.ViewHolder {

        public final View mView;
        TextView date, percentage, seconds;

        CustomViewHolder(View itemView) {
            super(itemView);
            mView = itemView;
            date = mView.findViewById(R.id.textView10);
            percentage = mView.findViewById(R.id.textView11);
            seconds = mView.findViewById(R.id.textView12);
        }
    }

    @Override
    public CustomViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.view_holder_my_top_results, parent, false);
        return new CustomViewHolder(view);
    }
    public void setDataList(List<Result> newDataList) {
        this.dataList = newDataList;
        notifyDataSetChanged();
    }

    @Override
    public void onBindViewHolder(CustomViewHolder holder, int position) {
        Result currentResult = dataList.get(position);
        holder.date.setText(String.valueOf(currentResult.getDatum()));
        holder.seconds.setText(String.valueOf(currentResult.getSekunde()) + "s");
        holder.percentage.setText(String.valueOf(currentResult.getPostotak()) + "%");
    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

}